import { inject, injectable } from 'inversify';
import { Response, Request } from 'express';
import { Component } from '../../../types/component-enum.js';
import { Logger } from '../../logger/logger.interface.js';
import { CreateUserRequest } from './create-user-reques.type.js';
import { CreateUserDto, LoginUserDto, UserService } from './index.js';
import { Config } from '../../config/index.js';
import { TRestSchema } from '../../../types/rest-schema-type.js';
import { StatusCodes } from 'http-status-codes';
import { fillDTO } from '../../../helpers/common.js';
import { UserRdo } from './rdo/user.rdo.js';
import { LoginUserRequest } from './index.js';
import { BaseController, HttpMethod, HttpError, UploadFileMiddleware, ValidateDtoMiddleware, ValidateObjectIdMiddleware, PrivateRouteMiddleware } from '../../../rest/index.js';
import { AuthService } from '../auth/auth-service.interface.js';
import { LoggedUserRdo } from './rdo/logged-user.rdo.js';

@injectable()
export class UserController extends BaseController {
  constructor (
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly configService: Config<TRestSchema>,
    @inject(Component.AuthService) private readonly authService: AuthService,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController...');
    this.addRoute({
      path: '/register',
      method: HttpMethod.POST,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateUserDto)]
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.POST,
      handler: this.login,
      middlewares: [new ValidateDtoMiddleware(LoginUserDto)]
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.GET,
      handler: this.checkAuthenticate,
      middlewares: [
        new PrivateRouteMiddleware(),
      ]
    });
    this.addRoute({
      path: '/:userID/avatar',
      method: HttpMethod.POST,
      handler: this.uploadAvatar,
      middlewares: [
        new ValidateObjectIdMiddleware('userID'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'avatar')
      ]
    });
    this.addRoute({
      path: '/favorite/:offerID',
      method: HttpMethod.PATCH,
      handler: this.toggleFavorites,
      middlewares: [
        new PrivateRouteMiddleware(),
      ]
    });
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

  public async login(
    { body }: LoginUserRequest,
    res: Response,
  ): Promise<void> {
    const user = await this.authService.verify(body);
    const token = await this.authService.authenticate(user);
    const responseData = fillDTO(LoggedUserRdo, {
      email: user.email,
      token,
    });
    this.ok(res, responseData);
  }

  public async checkAuthenticate({ tokenPayload: { email }}: Request, res: Response) {
    const foundedUser = await this.userService.findByEmail(email);

    if (! foundedUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    this.ok(res, fillDTO(LoggedUserRdo, foundedUser));
  }

  public async uploadAvatar(req: Request, res: Response) {
    this.created(res, {
      filepath: req.file?.path
    });
  }

  public async toggleFavorites({ tokenPayload, params }: Request, res: Response) {
    const foundedUser = await this.userService.findByEmail(tokenPayload.email);

    if (! foundedUser) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        'User not found',
        'UserController'
      );
    }

    if (foundedUser.favoritesOffers.includes(params.offerID)) {
      foundedUser.favoritesOffers = foundedUser.favoritesOffers.filter((item) => item !== params.offerID);
    } else {
      foundedUser.favoritesOffers.push(params.offerID);
    }
    this.userService.updateById(tokenPayload.id, {favoritesOffers: foundedUser.favoritesOffers});
    this.ok(res, fillDTO(UserRdo, foundedUser));
  }
}
