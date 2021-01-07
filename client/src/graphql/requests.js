import { JobQuery, JobsQuery } from './queries/job';

const URL = 'http://localhost:9000/graphql';

const graphQLRequest = async (query, variables = {}) => {
  const response = await fetch(URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query: query(), variables }),
  });
  const { data } = await response.json();
  return data;
};

export const fetchJobs = async () => {
  const data = await graphQLRequest(JobsQuery);
  return data.jobs;
};

export const fetchJob = async (id) => {
  const data = await graphQLRequest(JobQuery, { id });
  return data.job;
};
