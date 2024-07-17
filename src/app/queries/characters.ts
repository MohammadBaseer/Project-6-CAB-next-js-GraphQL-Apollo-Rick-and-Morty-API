import { gql } from "@apollo/client";

export const GETCHARACTERSDATA = gql`
  query Results($filter: FilterEpisode) {
    episodes(filter: $filter) {
      results {
        episode
        name
        characters {
          image
        }
      }
    }
  }
`;
