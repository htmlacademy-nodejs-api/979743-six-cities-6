import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { OfferService } from './offer-service.interface.js';
import { Component } from '../../../types/component-enum.js';
import { DefaultOfferService } from './default-offer.servise.js';
import { OfferEntity, OfferModel } from './offer.entity.js';
import { Controller } from '../../../rest/controller/controller.interface.js';
import { OfferController } from './offer.controller.js';

export function createOfferContainer() {
  const offerContainer = new Container();

  offerContainer.bind<OfferService>(Component.OfferService).to(DefaultOfferService);
  offerContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
  offerContainer.bind<Controller>(Component.OfferController).to(OfferController).inSingletonScope();

  return offerContainer;
}
