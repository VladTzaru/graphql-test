import { JobQuery, JobsQuery } from './queries/job';
import { CompanyQuery } from './queries/company';
import { CreateJobMutation } from './mutations/job';
import { getAccessToken, isLoggedIn } from '../auth';

const URL = 'http://localhost:9000/graphql';

// Generic method for graphQL requests
const graphQLRequest = async (query, variables = {}) => {
  const request = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query: query(), variables }),
  };

  if (isLoggedIn())
    request.headers['authorization'] = 'Bearer ' + getAccessToken();

  const response = await fetch(URL, request);
  const responseBody = await response.json();
  if (responseBody.errors) {
    const message = responseBody.errors
      .map((error) => error.message)
      .join('\n');
    throw new Error(message);
  }
  return responseBody.data;
};

// Queries
export const fetchJobs = async () => {
  const { jobs } = await graphQLRequest(JobsQuery);
  return jobs;
};

export const fetchJob = async (id) => {
  const { job } = await graphQLRequest(JobQuery, { id });
  return job;
};

export const fetchCompany = async (id) => {
  const { company } = await graphQLRequest(CompanyQuery, { id });
  return company;
};

// Mutations
export const createJob = async (jobDetails) => {
  const { job } = await graphQLRequest(CreateJobMutation, { jobDetails });
  return job;
};
