require('dotenv').config();

const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const hostValidation = require('host-validation');
const {
  ApolloServer,
  gql,
  makeExecutableSchema,
  AuthenticationError,
} = require('apollo-server-express');
const { prisma } = require('../prisma-client');
const authRouter = require('./authRouter');
const telegramRouter = require('./telegramRouter');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  hostValidation({
    hosts: [
      `localhost:${process.env.PORT}`,
      'khjlji-wedding-invitation.herokuapp.com',
    ],
  })
);
const hostProduction = 'https://khjlji-wedding-invitation.herokuapp.com';

const typeDefs = gql(
  fs.readFileSync(__dirname.concat('/schema.graphql'), 'utf8')
);
const commentFragment = `
  fragment CommentWithUser on Comment {
    id
    text
    createdAt
    user {
      id
      provider
      name
    }
  }
`;
const giftFragment = `
  fragment GiftWithReservation on Gift {
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
`;
const reservationFragment = `
  fragment ReservationWithUserAndGift on Reservation {
    id
    text
    user {
      id
      provider
      name
    }
    gift {
      id
      name
    }
  }
`;
const resolvers = {
  Query: {
    comments: async (parent, args) => {
      return await prisma.comments(args).$fragment(commentFragment);
    },
    gifts: async (parent, args) => {
      return await prisma.gifts(args).$fragment(giftFragment);
    },
    reservations: async (parent, args) => {
      return await prisma.reservations(args).$fragment(reservationFragment);
    },
  },
  Mutation: {
    createComment: async (parent, { data }, context) => {
      if (data.user.connect.key !== context.key) {
        throw new AuthenticationError();
      }
      const newComment = await prisma
        .createComment(data)
        .$fragment(commentFragment);
      fetch(`${hostProduction}/telegram`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: 'comment', data: newComment }),
      });
      return newComment;
    },
    deleteComment: async (parent, { where }, context) => {
      const commentExist = await prisma.$exists.comment({
        ...where,
        user: { key: context.key },
      });
      if (!commentExist) {
        throw new AuthenticationError();
      }
      return await prisma.deleteComment(where);
    },
    createReservation: async (parent, { data }, context) => {
      if (data.user.connect.key !== context.key) {
        throw new AuthenticationError();
      }
      const newReservation = await prisma
        .createReservation(data)
        .$fragment(reservationFragment);
      fetch(`${hostProduction}/telegram`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: 'reservation', data: newReservation }),
      });
      return newReservation;
    },
    deleteReservation: async (parent, { where }, context) => {
      const reservationExist = await prisma.$exists.reservation({
        ...where,
        user: { key: context.key },
      });
      if (!reservationExist) {
        throw new AuthenticationError();
      }
      return await prisma.deleteReservation(where);
    },
  },
};
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
});
const gqlServer = new ApolloServer({
  schema,
  context: async ({ req }) => {
    const authHeader = req.headers.authorization || '';
    if (authHeader) {
      try {
        const key = authHeader.split(' ')[1];
        return { key };
      } catch (e) {}
    }
  },
});
gqlServer.applyMiddleware({ app });

app.use('/api', authRouter);
app.use('/telegram', telegramRouter);
app.use(
  express.static(path.join(__dirname, '../../public'), { extensions: ['html'] })
);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = app;
