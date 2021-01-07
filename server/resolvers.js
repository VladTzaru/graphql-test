const db = require('./db');

const Query = {
  // First arg (root) is a parent and second is the query variables ({id})
  job: (_, { id }) => db.jobs.get(id),
  jobs: () => db.jobs.list(),
  company: (_, { id }) => db.companies.get(id),
};

const Mutation = {
  createJob: (_, { companyId, title, description }) =>
    db.jobs.create({ companyId, title, description }),
};

const Job = {
  company: (job) => db.companies.get(job.companyId),
};

const Company = {
  jobs: (company) =>
    db.jobs.list().filter((job) => job.companyId === company.id),
};

module.exports = { Query, Mutation, Job, Company };
