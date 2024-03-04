import { inject, injectable } from 'inversify';
import { Response } from 'express';
import { BaseController } from '../../../rest/controller/base-controller.abstract.js';
import { Component } from '../../../types/component-enum.js';
import { Logger } from '../../logger/logger.interface.js';
import { HttpMethod } from '../../../rest/types/http-method.enum.js';
import { CreateUserRequest } from './create-user-reques.typet.js';
import { UserService } from './index.js';
import { Config } from '../../config/index.js';
import { TRestSchema } from '../../../types/rest-schema-type.js';
import { StatusCodes } from 'http-status-codes';
import { HttpError } from '../../../rest/errors/http-error.js';
import { fillDTO } from '../../../helpers/common.js';
import { UserRdo } from './rdo/user.rdo.js';

@injectable()
export class UserController extends BaseController {
  constructor (
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly configService: Config<TRestSchema>
  ) {
    super(logger);
    this.logger.info('Register routes for UserController...');
    this.addRoute({ path: '/register', method: HttpMethod.POST, handler: this.create});
  }

  public async create(
    { body }: CreateUserRequest,
    res: Response,
  ): Promise<void> {
    const exixtsUser = await this.userService.findByEmail(body.email);
    if(exixtsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» exists.`,
        'UserController'
      );
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(res, fillDTO(UserRdo, result));
  }
}
