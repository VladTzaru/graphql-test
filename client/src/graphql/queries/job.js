import gql from 'graphql-tag';

export const JobQuery = () =>
  gql`
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

export const JobsQuery = () =>
  gql`
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
