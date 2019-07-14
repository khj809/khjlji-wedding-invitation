import { gql } from 'apollo-boost';

const GET_COMMENTS = gql`
  query($first: Int, $after: String) {
    comments(orderBy: createdAt_DESC, first: $first, after: $after) {
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
  mutation AddComment($data: CommentCreateInput!) {
    createComment(data: $data) {
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
  mutation DeleteComment($where: CommentWhereUniqueInput!) {
    deleteComment(where: $where) {
      id
    }
  }
`;

const GET_GIFTS = gql`
  query {
    gifts {
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
  mutation AddReservation($data: ReservationCreateInput!) {
    createReservation(data: $data) {
      id
      user {
        id
        provider
        name
      }
      gift {
        id
      }
    }
  }
`;

const DELETE_RESERVATION = gql`
  mutation DeleteReservation($where: ReservationWhereUniqueInput!) {
    deleteReservation(where: $where) {
      id
    }
  }
`;

export {
  GET_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  GET_GIFTS,
  ADD_RESERVATION,
  DELETE_RESERVATION,
};
