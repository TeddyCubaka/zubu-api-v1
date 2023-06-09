import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type PropretyDocument = Proprety & Document;

enum types {
  OFFICE,
  HOUSE,
  STUDIO,
  SPACE,
  APARTMENT,
}
enum Currencies {
  USD,
  CDF,
}
class RentalInformationType {
  @Prop()
  propretyType: string;
  @Prop()
  availability: boolean;
  @Prop()
  price: number;
  @Prop()
  guarantee: number;
  @Prop()
  monentaryCurrency: Currencies;
  @Prop()
  localisation: string;
  @Prop()
  lessorName: string;
  @Prop()
  lessorContacts: string[];
}

type AnnouncementPeriodType = [Date, Date];

class AnnouncementType {
  @Prop()
  announcementPeriod: AnnouncementPeriodType;
  @Prop()
  isAvailable: boolean;
}

interface GalleryType {
  url: string;
  width: number;
  height: number;
  size: number;
  createAt: Date;
  deleteAt: Date;
  uploadAt: Date;
  publicId: string;
  assetId: string;
}

interface RoomType {
  room: string;
  number: number;
}

interface tenantCharge {
  charge: string;
  price: string;
}

@Schema({ timestamps: true })
export class Proprety {
  @Prop()
  owner: string;

  @Prop({ required: true })
  type: string;

  @Prop({ unique: true })
  address: string;

  @Prop()
  rentalInformation: RentalInformationType;

  @Prop()
  announcement: AnnouncementType;

  @Prop()
  gallery: GalleryType[];

  @Prop({ required: true })
  rooms: RoomType[];

  @Prop()
  tenantCharge: tenantCharge[];

  @Prop()
  visits: string[];

  @Prop()
  questions: string[];
}

export const PropretySchema = SchemaFactory.createForClass(Proprety);
