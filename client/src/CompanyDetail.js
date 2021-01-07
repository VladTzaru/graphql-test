import React, { useState, useEffect } from 'react';
import { fetchCompany } from './graphql/requests';

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
      </div>
    )
  );
};
