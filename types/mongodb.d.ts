import { MongoClient } from 'mongodb'
import "next-auth";


declare global {
  var _mongoClientPromise: Promise<MongoClient>
}

declare module "next-auth" {
  interface User {
    id: number;
  }

  interface Session {
    user: User;
  }
}
