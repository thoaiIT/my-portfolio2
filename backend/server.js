import express from 'express';
import dotenv from 'dotenv';
import { graphqlHTTP } from 'express-graphql';
import typeDefs from './schemas/schema.js';
import connectDB from './config/db.js';
import authResolver from './resolvers/authResolver.js';
import userResolver from './resolvers/userResolver.js';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { applyMiddleware } from 'graphql-middleware';
import { permissions } from './middlewares/authRules.js';
import cors from 'cors';
import { CustomError } from './utils/customError.js';
import skillResolver from './resolvers/skillResolver.js';

// Load biến môi trường
dotenv.config();

// Kết nối database
connectDB();

// Khởi tạo Express
const app = express();

app.use(cors());

app.use(express.json());

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: {
      ...userResolver.Query, // User resolver (cần xác thực)
      ...skillResolver.Query,
    },
    Mutation: {
      ...userResolver.Mutation, // User resolver (cần xác thực)
      ...authResolver.Mutation, // Auth resolver (không cần xác thực)
      ...skillResolver.Mutation,
    },
  },
});

// Áp dụng middleware với Shield
const schemaWithMiddleware = applyMiddleware(schema, permissions);

// Tích hợp GraphQL
app.use(
  '/graphql',
  graphqlHTTP((req) => {
    return {
      schema: schemaWithMiddleware,
      graphiql: true,
      context: { req }, // Truyền req vào context
      customFormatErrorFn: (err) => {
        // Nếu lỗi là CustomError, trả về chi tiết
        if (err.originalError instanceof CustomError) {
          return {
            message: err.message,
            status: err.originalError.status,
            code: err.originalError.code,
            locations: err.locations,
            path: err.path,
          };
        }

        // Lỗi khác, trả về thông báo chung
        return {
          message: err.message || 'Internal server error',
          status: 500,
          code: 'INTERNAL_SERVER_ERROR',
          locations: err.locations,
          path: err.path,
        };
      },
    };
  })
);

// Khởi động server
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/graphql`);
});
