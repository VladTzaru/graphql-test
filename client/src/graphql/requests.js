import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from 'apollo-boost';
import { JobQuery, JobsQuery } from './queries/job';
import { CompanyQuery } from './queries/company';
import { CreateJobMutation } from './mutations/job';
import { getAccessToken, isLoggedIn } from '../auth';

const URL = 'http://localhost:9000/graphql';

// A middleware we use before we send a HTTP link as presented below
const authLink = new ApolloLink((operation, forward) => {
  if (isLoggedIn())
    operation.setContext({
      headers: {
        authorization: `Bearer ${getAccessToken()}`,
      },
    });

  return forward(operation);
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, new HttpLink({ uri: URL })]),
  cache: new InMemoryCache(),
});

// Generic method for graphQL requests
// const graphQLRequest = async (query, variables = {}) => {
//   const request = {
//     method: 'POST',
//     headers: { 'content-type': 'application/json' },
//     body: JSON.stringify({ query: query(), variables }),
//   };

//   if (isLoggedIn())
//     request.headers['authorization'] = 'Bearer ' + getAccessToken();

//   const response = await fetch(URL, request);
//   const responseBody = await response.json();
//   if (responseBody.errors) {
//     const message = responseBody.errors
//       .map((error) => error.message)
//       .join('\n');
//     throw new Error(message);
//   }
//   return responseBody.data;
// };

// Queries
export const fetchJobs = async () => {
  const {
    data: { jobs },
  } = await client.query({ query: JobsQuery(), fetchPolicy: 'no-cache' });
  return jobs;
};

export const fetchJob = async (id) => {
  const {
    data: { job },
  } = await client.query({ query: JobQuery(), variables: { id } });
  return job;
};

export const fetchCompany = async (id) => {
  const {
    data: { company },
  } = await client.query({ query: CompanyQuery(), variables: { id } });
  return company;
};

// Mutations
export const createJob = async (jobDetails) => {
  const {
    data: { job },
  } = await client.mutate({
    mutation: CreateJobMutation(),
    variables: { jobDetails },
  });
  return job;
};
