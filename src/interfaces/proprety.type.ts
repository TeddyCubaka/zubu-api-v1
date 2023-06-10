export interface FilterPropreties {
  city?: string;
  township?: string;
  roomType?: string;
  type?: string;
  price?: priceFilterType;
  guarantee?: number;
}

export interface FindPropretiesFilter {
  city?: object;
  townShip?: object;
  type?: object;
  'rentalInformation.roomType'?: object;
  'rentalInformation.price'?: object;
  'rentalInformation.guarantee'?: object;
}

export type priceFilterType = [number, number];
