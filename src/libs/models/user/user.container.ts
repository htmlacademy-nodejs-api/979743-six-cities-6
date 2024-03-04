import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { UserService } from './user-serice.interface.js';
import { Component } from '../../../types/component-enum.js';
import { DefaultUserService } from './default-user.service.js';
import { UserModel, UserEntity } from './user.entity.js';
import { Controller } from '../../../rest/controller/controller.interface.js';
import { UserController } from './user.controller.js';

export function createUserContainer() {
  const userContainer = new Container();
  userContainer.bind<UserService>(Component.UserService).to(DefaultUserService).inSingletonScope();
  userContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
  userContainer.bind<Controller>(Component.UserController).to(UserController).inSingletonScope();

  return userContainer;
}
