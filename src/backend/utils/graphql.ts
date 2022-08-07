import { GraphQLClient, gql } from "graphql-request";
import { HASURA_GRAPHQL_ENDPOINT, HASURA_ADMIN_SECRET } from "../config";

const client = new GraphQLClient(HASURA_GRAPHQL_ENDPOINT, {
  headers: {
    "x-hasura-admin-secret": HASURA_ADMIN_SECRET
  }
});

const insertUser = async ({ name, provider, key }: { name: string; provider: string; key: string }) => {
  const { insert_Users_one } = await client.request(
    gql`
      mutation($name: String!, $provider: String!, $key: String!) {
        insert_Users_one(
          on_conflict: { constraint: Users_provider_key_key, update_columns: [name, provider, key] }
          object: { key: $key, name: $name, provider: $provider }
        ) {
          id
          key
          name
          provider
        }
      }
    `,
    {
      name,
      provider,
      key
    }
  );

  return insert_Users_one;
};

export { insertUser };
