import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type PropretyDocument = Proprety & Document;

export enum types {
  OFFICE,
  HOUSE,
  STUDIO,
  SPACE,
  APARTMENT,
}
export enum Currencies {
  USD,
  CDF,
}

export enum TypeByRooms {
  STUDIO,
  F1,
  F2,
  F3,
  F4,
  F5,
  F6,
  F7,
}

export class RentalInformationType {
  @Prop()
  roomType: string;
  @Prop()
  isAvailable: boolean;
  @Prop()
  price: number;
  @Prop()
  guarantee: number;
  @Prop()
  monetaryCurrency: Currencies;
  @Prop()
  localisation: string;
  @Prop()
  lessorName: string;
  @Prop()
  lessorContacts: string[];
  @Prop()
  numberOfBedrooms: number;
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

class RoomType {
  @Prop()
  room: string;
  @Prop()
  number: number;
}

export class InteriorRooms {
  @Prop({ default: 0 })
  bedrooms: number;
  @Prop({ default: 0 })
  livingRoom: number;
  @Prop({ default: 0 })
  lounge: number;
  @Prop({ default: 0 })
  diningRoom: number;
  @Prop({ default: 0 })
  kitchen: number;
  @Prop({ default: 0 })
  floor: number;
  @Prop({ default: 0 })
  toilet: number;
  @Prop({ default: 0 })
  bathroom: number;
  @Prop()
  other: RoomType;
}

export class ExteriorRooms {
  @Prop({ default: 0 })
  toilets: number;
  @Prop({ default: 0 })
  bathrooms: number;
  @Prop({ default: 0 })
  garage: number;
  @Prop({ default: 0 })
  garden: number;
  @Prop({ default: 0 })
  terrace: number;
  @Prop({ default: 0 })
  balcony: number;
  @Prop()
  other: RoomType[];
}

class Rooms {
  @Prop()
  interior: InteriorRooms;
  @Prop()
  exterior: ExteriorRooms;
}

class TenantCharge {
  @Prop()
  charge: string;
  @Prop()
  price: string;
}

export class TenantCharges {
  @Prop()
  electricity: string;
  @Prop()
  water: string;
  @Prop()
  dustbin: string;
  @Prop()
  homeCare: string;
  @Prop()
  housePainting: string;
  other: TenantCharge[];
}

class ViewsPerWeek {
  @Prop()
  startTime: Date;
  @Prop()
  endTime: Date;
  @Prop()
  numberOfView: number;
}

class ViewsPerMonth {
  @Prop()
  startTime: Date;
  @Prop()
  endTime: Date;
  @Prop()
  numberOfView: number;
}

export class StatisticsType {
  @Prop()
  referencingNote: number;
  @Prop()
  averagePiewsPerWeek: number;
  @Prop()
  averagePrade: number;
  @Prop()
  averageViewsPerMonth: number;
  @Prop()
  personWhoNoted: number;
  @Prop()
  averageVisitsPerWeek: number;
  @Prop()
  viewsPerWeek: ViewsPerWeek;
  @Prop()
  viewsPerMonth: ViewsPerMonth;
}

@Schema({ timestamps: true })
export class Proprety {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Users', required: true })
  owner: Types.ObjectId;

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
  rooms: Rooms;

  @Prop()
  tenantCharges: TenantCharges;

  @Prop()
  visits: string[];

  @Prop()
  questions: string[];

  @Prop()
  statics: StatisticsType;
}

export const PropretySchema = SchemaFactory.createForClass(Proprety);
