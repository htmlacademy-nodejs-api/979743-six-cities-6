import { TokenPayload } from './src/libs/models/auth/index.js';

declare module 'express-serve-static-core' {
  export interface Request {
    tokenPayload: TokenPayload;
  }
}
