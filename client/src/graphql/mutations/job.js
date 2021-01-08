import gql from 'graphql-tag';

export const CreateJobMutation = () =>
  gql`
    mutation CreateJob($jobDetails: CreateJobInput) {
      job: createJob(jobDetails: $jobDetails) {
        id
        title
        description
      }
    }
  `;
