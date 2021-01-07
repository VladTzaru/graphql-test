const db = require('./db');

const Query = {
  // First arg (root) is a parent and second is the query variables ({id})
  job: (_, { id }) => db.jobs.get(id),
  jobs: () => db.jobs.list(),
  company: (_, { id }) => db.companies.get(id),
};

const Job = {
  company: (job) => db.companies.get(job.companyId),
};

module.exports = { Query, Job };
