import { Request } from 'express';
import { RequestBody} from '../../../rest/types/request-body.type.js';
import { RequestParams } from '../../../rest/types/request-params.type.js';
import { CreateUserDto } from './index.js';

export type CreateUserRequest = Request<RequestParams, RequestBody, CreateUserDto>;
