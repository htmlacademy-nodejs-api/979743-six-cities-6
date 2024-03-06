import { ParamsDictionary } from 'express-serve-static-core';

export type ParamOfferId = {
  offerID: string;
} | ParamsDictionary;
