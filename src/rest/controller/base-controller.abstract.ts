import { injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { Response, Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { Controller } from './controller.interface.js';
import { IRoute } from '../types/route.interface.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { DEFAULT_CONTENT_TYPE } from '../rest.constant.js';

@injectable()
export abstract class BaseController implements Controller {
  public readonly router: Router;
  constructor(
    protected readonly logger: Logger
  ) {
    this.router = Router();
  }

  public addRoute(route: IRoute) {
    const wrapperAsyncHandler = expressAsyncHandler(route.handler.bind(this));
    // this.router[route.method](route.path, wrapperAsyncHandler);
    const middlewareHandlers = route.middlewares?.map(
      (item) => expressAsyncHandler(item.execute.bind(item))
    );
    const allHandlers = middlewareHandlers ? [...middlewareHandlers, wrapperAsyncHandler] : wrapperAsyncHandler;
    this.router[route.method](route.path, allHandlers);
    this.logger.info(`Route registered: ${route.method.toUpperCase()} ${route.path}`);
  }

  public send<T>(res: Response, statusCode: number, data: T): void {
    res
      .type(DEFAULT_CONTENT_TYPE)
      .status(statusCode)
      .json(data);
  }

  public created<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.CREATED, data);
  }

  public noContent<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.NO_CONTENT, data);
  }

  public ok<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }
}
