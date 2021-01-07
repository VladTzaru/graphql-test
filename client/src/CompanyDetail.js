import React, { useState, useEffect } from 'react';
import { fetchCompany } from './graphql/requests';
import { JobList } from './JobList';

export const CompanyDetail = ({ match: { params } }) => {
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const { companyId } = params;

    const getCompany = async () => {
      const company = await fetchCompany(companyId);
      setCompany(company);
    };
    getCompany();
  }, [params]);

  return (
    company && (
      <div>
        <h1 className='title'>{company.name}</h1>
        <div className='box'>{company.description}</div>
        <h5 className='title is-5'>Jobs at {company.name}</h5>
        <JobList jobs={company.jobs} />
      </div>
    )
  );
};
