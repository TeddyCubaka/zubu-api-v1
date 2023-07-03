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
  const filterObject: FindPropretiesFilter = {};
  if (filter.city) filterObject['city'] = { address: { $regex: filter.city } };
  if (filter.city)
    filterObject['township'] = { township: { $regex: filter.city } };
  if (filter.city) filterObject['type'] = { type: { $regex: filter.city } };
  if (filter.price)
    filterObject['price'] = {
      'rentalInformation.price': { $gt: filter.price[0], $lt: filter.price[1] },
    };
  if (filter.guarantee)
    filterObject['guarantee'] = {
      'rentalInformation.guarantee': { $regex: filter.guarantee },
    };
  if (filter.roomType)
    filterObject['roomType'] = {
      'rentalInformation.roomType': { $regex: filter.roomType },
    };

  return filterObject;
};

// export const rentalTypeVerificator = (datas: TypeByRooms) => {};
