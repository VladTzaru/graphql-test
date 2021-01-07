export const CreateJobMutation = () =>
  `
  mutation CreateJob($jobDetails: CreateJobInput) {
    job: createJob(jobDetails: $jobDetails) {
      id
      title
      description
    }
  } 
`;
