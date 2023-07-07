import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

enum AccountTypes {
  LESSOR,
  REAL_ESTATE_AGENCE,
  PROPRETY_AGENT,
}

@Schema()
class Notification {
  @Prop()
  type: string;
  @Prop()
  url: string;
  @Prop()
  writingDate: string;
  @Prop()
  object: string;
  @Prop()
  content: string;
  @Prop()
  readed: boolean;
  @Prop()
  readAt: Date;
}

@Schema({ timestamps: true })
export class User {
  @Prop()
  accountType: AccountTypes;

  @Prop({ unique: true })
  username: string;

  @Prop({ unique: true })
  mail: string;

  @Prop({ required: true })
  password: string;

  @Prop({ unique: true })
  phoneNumber: string;

  @Prop()
  pictureUrl: string;

  @Prop()
  gender: string;

  @Prop()
  pendingVisits: string[];

  @Prop()
  sendingVisits: string[];

  @Prop()
  savedPropreties: string[];

  @Prop()
  notifications: Notification[];
}

export const UserSchema = SchemaFactory.createForClass(User);
