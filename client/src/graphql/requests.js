import { JobQuery, JobsQuery } from './queries/job';
import { CompanyQuery } from './queries/company';

const URL = 'http://localhost:9000/graphql';

// Generic method for graphQL requests
const graphQLRequest = async (query, variables = {}) => {
  const response = await fetch(URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query: query(), variables }),
  });
  const responseBody = await response.json();
  if (responseBody.errors) {
    const message = responseBody.errors
      .map((error) => error.message)
      .join('\n');
    throw new Error(message);
  }
  return responseBody.data;
};

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
