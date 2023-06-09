import {
  FilterPropreties,
  FindPropretiesFilter,
} from 'src/interfaces/proprety.type';

export const foundCity = (address: string) => {
  return address.split('/')[0];
};

export const foundTownship = (address: string) => {
  return address.split('/')[1];
};

export const filterPropretiesObject = (filter: FilterPropreties) => {
  const obj: FindPropretiesFilter = {};
  obj['city'] = { $regex: filter.city };

  return obj;
  // return {
  //   city: { $regex: filter.city } ,
  //   townShip: { $regex: filter.township },
  //   type: { $eq: filter.type },
  //   'monentaryCurrency.roomType': { $eq: filter.roomType },
  //   'rentalInformation.price': { $gt: filter.price[0], $lt: filter.price[1] },
  //   'monentaryCurrency.guarantie': { $eq: filter.guarantie },
  // };
};
