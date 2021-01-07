export const JobQuery = () => `
    query JobQuery($id: ID!) {
        job(id: $id) {
        id
        title
        company {
            id
            name
        }
        description
        }
    }  
`;

export const JobsQuery = () => ` 
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
`;
