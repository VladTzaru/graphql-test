import { JobQuery, JobsQuery } from './queries/job';
const URL = 'http://localhost:9000/graphql';

export const fetchJobs = async () => {
  const response = await fetch(URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      query: JobsQuery(),
    }),
  });
  const { data } = await response.json();
  return data.jobs;
};

export const fetchJob = async (id) => {
  const response = await fetch(URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      query: JobQuery(),
      variables: {
        id,
      },
    }),
  });
  const { data } = await response.json();
  return data.job;
};
