import { gql } from "apollo-boost";

const GET_COMMENTS = gql`
  query($offset: Int, $limit: Int) {
    Comments(order_by: { createdAt: desc }, offset: $offset, limit: $limit) {
      id
      user {
        id
        provider
        name
      }
      text
      createdAt
    }
  }
`;

const ADD_COMMENT = gql`
  mutation($text: String!) {
    insert_Comments_one(object: { text: $text }) {
      id
      user {
        id
        provider
        name
      }
      text
      createdAt
    }
  }
`;

const DELETE_COMMENT = gql`
  mutation($id: String!) {
    delete_Comments_by_pk(id: $id) {
      id
    }
  }
`;

const GET_GIFTS = gql`
  query {
    Gifts {
      id
      name
      image
      link
      reservation {
        id
        user {
          id
          provider
          name
        }
      }
    }
  }
`;

const ADD_RESERVATION = gql`
  mutation AddReservation($giftId: String!, $text: String!) {
    insert_Reservations_one(object: { giftId: $giftId, text: $text }) {
      id
      gift {
        id
      }
    }
  }
`;

const DELETE_RESERVATION = gql`
  mutation DeleteReservation($id: String!) {
    delete_Reservations_by_pk(id: $id) {
      id
    }
  }
`;

export { GET_COMMENTS, ADD_COMMENT, DELETE_COMMENT, GET_GIFTS, ADD_RESERVATION, DELETE_RESERVATION };
