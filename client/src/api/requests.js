const URL = 'http://localhost:9000/graphql';

export const fetchJobs = async () => {
  const response = await fetch(URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      query: `
      {
        jobs {
          id
          title
          company {
            id
            name
          }
        }
      }      
      `,
    }),
  });
  const { data } = await response.json();
  return data.jobs;
};
