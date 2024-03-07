import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../user/rdo/user.rdo.js';

export class CommentRdo {
  @Expose()
  public text: string;

  @Expose()
  public rating: number;

  @Expose({ name: 'createdAt' })
  public date: string;

  @Expose({ name: 'authorID' })
  @Type(() => UserRdo)
  public author: UserRdo;
}
