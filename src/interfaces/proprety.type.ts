export interface FilterPropreties {
  city?: string;
  township?: string;
  roomType?: string;
  type?: string;
  price?: priceFilterType;
  guarantie?: number;
}

export interface FindPropretiesFilter {
  city?: object;
  townShip?: object;
  type?: object;
  'monentaryCurrency.roomType'?: object;
  'rentalInformation.price'?: object;
  'monentaryCurrency.guarantie'?: object;
}

export type priceFilterType = [string, string];
