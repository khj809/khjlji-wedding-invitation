import client from './client';
import * as query from './query';

const getAuthContext = user => {
  return {
    headers: {
      Authorization: `Bearer ${user.key}`,
    },
  };
};

const getComments = async ({ first, after }) => {
  const res = await client.query({
    query: query.GET_COMMENTS,
    variables: {
      first,
      after,
    },
  });
  const comments = res.data.comments;
  return comments;
};

const createComment = async ({ user, text }) => {
  const res = await client.mutate({
    mutation: query.ADD_COMMENT,
    variables: {
      data: {
        user: {
          connect: {
            key: user.key,
          },
        },
        text,
      },
    },
    context: getAuthContext(user),
  });
  const newComment = res.data.createComment;
  return newComment;
};

const deleteComment = async ({ user, comment }) => {
  const res = await client.mutate({
    mutation: query.DELETE_COMMENT,
    variables: {
      where: {
        id: comment.id,
      },
    },
    context: getAuthContext(user),
  });
  const deletedComment = res.data.deleteComment;
  return deletedComment;
};

const getGifts = async () => {
  const res = await client.query({ query: query.GET_GIFTS });
  const gifts = res.data.gifts;
  return gifts;
};

const createReservation = async ({ user, gift, text }) => {
  const res = await client.mutate({
    mutation: query.ADD_RESERVATION,
    variables: {
      data: {
        user: {
          connect: {
            key: user.key,
          },
        },
        gift: {
          connect: {
            id: gift.id,
          },
        },
        text,
      },
    },
    context: getAuthContext(user),
  });
  const newReservation = res.data.createReservation;
  return newReservation;
};

const deleteReservation = async ({ user, reservation }) => {
  const res = await client.mutate({
    mutation: query.DELETE_RESERVATION,
    variables: { where: { id: reservation.id } },
    context: getAuthContext(user),
  });
  const deletedReservation = res.data.deleteReservation;
  return deletedReservation;
};

const signup = async ({ provider, accessToken }) => {
  const res = await fetch('/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      provider,
      accessToken,
    }),
  });
  const resBody = await res.json();
  return resBody;
};

export {
  getComments,
  createComment,
  deleteComment,
  getGifts,
  createReservation,
  deleteReservation,
  signup,
};
