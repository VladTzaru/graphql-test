import React, { useState, useEffect } from 'react';
import { JobList } from './JobList';
import { fetchJobs } from './graphql/requests';

export const JobBoard = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const getJobs = async () => {
      const jobs = await fetchJobs();
      setJobs(jobs);
    };
    getJobs();
  }, []);

  return (
    <div>
      <h1 className='title'>Job Board</h1>
      {jobs.length === 0 ? 'Loading...' : <JobList jobs={jobs} />}
    </div>
  );
};
