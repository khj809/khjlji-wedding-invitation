import client from "./client";
import * as query from "./query";

const getAuthContext = jwt => {
  return {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  };
};

const getComments = async ({ offset, limit }) => {
  const res = await client.query({
    query: query.GET_COMMENTS,
    variables: {
      offset,
      limit
    }
  });
  const comments = res.data.Comments;
  return comments;
};

const createComment = async ({ text }, jwt) => {
  const res = await client.mutate({
    mutation: query.ADD_COMMENT,
    variables: {
      text
    },
    context: getAuthContext(jwt)
  });
  const newComment = res.data.insert_Comments_one;
  return newComment;
};

const deleteComment = async ({ id }, jwt) => {
  const res = await client.mutate({
    mutation: query.DELETE_COMMENT,
    variables: {
      id
    },
    context: getAuthContext(jwt)
  });
  const deletedComment = res.data.delete_Comments_by_pk;
  return deletedComment;
};

const getGifts = async () => {
  const res = await client.query({ query: query.GET_GIFTS });
  const gifts = res.data.Gifts;
  return gifts;
};

const createReservation = async ({ giftId, text }, jwt) => {
  const res = await client.mutate({
    mutation: query.ADD_RESERVATION,
    variables: {
      giftId,
      text
    },
    context: getAuthContext(jwt)
  });
  const newReservation = res.data.insert_Reservations_one;
  return newReservation;
};

const deleteReservation = async ({ id }, jwt) => {
  const res = await client.mutate({
    mutation: query.DELETE_RESERVATION,
    variables: { id },
    context: getAuthContext(jwt)
  });
  const deletedReservation = res.data.delete_Reservations_by_pk;
  return deletedReservation;
};

export { getComments, createComment, deleteComment, getGifts, createReservation, deleteReservation };
