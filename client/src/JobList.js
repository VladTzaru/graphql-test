import React from 'react';
import { Link } from 'react-router-dom';

const renderJob = (job) => {
  const title = job.company ? `${job.title} at ${job.company.name}` : job.title;
  return (
    <li className='media' key={job.id}>
      <div className='media-content'>
        <Link to={`/jobs/${job.id}`}>{title}</Link>
      </div>
    </li>
  );
};

export const JobList = ({ jobs }) => {
  return <ul className='box'>{jobs.map(renderJob)}</ul>;
};
