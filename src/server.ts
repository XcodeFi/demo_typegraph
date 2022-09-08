// import { IUser } from "src/user/models/users.model";
import "reflect-metadata";

import { ApolloServer } from "apollo-server-express";
import * as Express from "express";

import * as cors from 'cors';

import Container from "typedi";
import { buildSchema } from "type-graphql";
import * as Mongoose from "mongoose";
import path = require("path");
import * as http from "http";

import { UserModel } from "./user/models/users.model";
import { authChecker } from "./auth/auth-checker";
// import { UserResolver } from "./user/users.resolver";
import { JwtConfext } from "./auth/JwtContext";
import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from "apollo-server-core";
// import { AuthResolver } from "./auth/auth.resolver";

Container.set({ id: "USER", factory: () => UserModel });

async function bootstrap() {
  require("dotenv").config(__dirname + ".env");

  const schema = await buildSchema({
    resolvers: [__dirname + "*/**/*.resolver.{ts,js}"],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
    container: Container,
    authChecker: authChecker,
  });

  const app = Express();
  // const MONGO_USER = process.env.MONGODB_USER
  // const MONGO_PASS = process.env.MONGODB_PASS
  Mongoose.connect(`mongodb://localhost:27017/my-api-db`, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
    .then(async () => {
      console.log("Mongodb is connected successfully");

      const httpServer = http.createServer(app);

      // Create GraphQL server
      const server = new ApolloServer({
        schema,

        // introspection: true,
        context: ({ req, res }) => {
          const ctx: JwtConfext = {
            // create mocked user in context
            // in real app you would be mapping user from `req.user` or sth
            req,
            res,
          };
          return ctx;
        },
        formatError: (err) => {
          // Don't give the specific errors to the client.
          if (err.message.startsWith("Database Error: ")) {
            return new Error("Internal server error 1");
          } else {
            return new Error(err.message);
          }

          // Otherwise return the original error. The error can also
          // be manipulated in other ways, as long as it's returned.
          return err;
        },
        plugins: [
          process.env.NODE_ENV === 'production' ?
            ApolloServerPluginLandingPageProductionDefault({ footer: false }) :
            ApolloServerPluginLandingPageLocalDefault({ footer: false })
        ]
      });

      // Mount a jwt or other authentication middleware that is run before the GraphQL execution
      // app.use(
      //   server.graphqlPath,
      //   jwt({
      //     secret: "TypeGraphQL",
      //     credentialsRequired: false,
      //   })
      // );

      // Add a list of allowed origins.
      // If you have more origins you would like to add, you can add them to the array below.
      // const allowedOrigins = ['http://localhost:3000'];

      const options: cors.CorsOptions = {
        origin: '*'// allowedOrigins
      };

      app.use(cors(options)); // enable cors

      await server.start();

      server.applyMiddleware({ app });

      const PORT = process.env.PORT;

      await new Promise<void>((resolve) =>
        httpServer.listen({ port: PORT }, resolve)
      );
      console.log(
        `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
      );
    })
    .catch((err) => {
      console.log(err);
    });
}
bootstrap();
