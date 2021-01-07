import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchJob } from './graphql/requests';

export const JobDetail = ({ match: { params } }) => {
  const [job, setJob] = useState(null);

  useEffect(() => {
    const { jobId } = params;
    const getJob = async () => {
      const job = await fetchJob(jobId);
      setJob(job);
    };
    getJob();
  }, [params]);

  return (
    job && (
      <div>
        <h1 className='title'>{job.title}</h1>
        <h2 className='subtitle'>
          <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
        </h2>
        <div className='box'>{job.description}</div>
      </div>
    )
  );
};
