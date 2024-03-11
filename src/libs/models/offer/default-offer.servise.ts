import { injectable, inject } from 'inversify';
import { OfferService } from './offer-service.interface.js';
import { Component } from '../../../types/index.js';
import { Logger } from '../../logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { OfferLimits } from './offer.constant.js';
import { Sorting } from '../../../const.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findByID(offerID: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerID)
      .populate(['authorID'])
      .exec();
  }

  public async find(count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ? count : OfferLimits.OFFER_COUNT;
    return this.offerModel
      .find({}, {}, {limit})
      .sort({ date: Sorting.DOWN })
      .populate(['authorID'])
      .exec();
  }

  public async findPremium(): Promise<DocumentType<OfferEntity>[]> {
    const limit = OfferLimits.PREMIUM_COUNT;
    return this.offerModel
      .find({isPremium: true})
      .sort({ date: Sorting.DOWN })
      .limit(limit)
      .populate(['authorID'])
      .exec();
  }

  public async findFavorites(userFavorites: string[]): Promise<DocumentType<OfferEntity>[]> {
    console.log('favorites offers are ', userFavorites);
    const allOffers = await this.offerModel.find();
    return allOffers.filter((offer) => userFavorites.includes(offer.id));
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['authorID'])
      .exec();
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': {
        commentsCount: 1,
      }})
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: documentId})) !== null;
  }
}
