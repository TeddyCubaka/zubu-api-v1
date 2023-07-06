import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Proprety, PropretyDocument } from 'src/schemas/proprety.schema';

@Injectable()
export class PropretyService {
  constructor(
    @InjectModel(Proprety.name) private PropretyModel: Model<PropretyDocument>,
  ) {}

  async create(Proprety: Proprety): Promise<Proprety> {
    const newProprety = new this.PropretyModel(Proprety);
    return newProprety
      .save()
      .then((data) => data)
      .catch((err) => {
        if (err.code === 11000)
          return {
            message: "l'adresse saisie est déjà prise.",
            err,
          };
        else return err;
      });
  }

  async readAll(): Promise<Proprety[]> {
    return await this.PropretyModel.find().exec();
  }

  async readById(id: string): Promise<Proprety> {
    return await this.PropretyModel.findById(id).exec();
  }

  async update(id: string, Proprety: Proprety): Promise<Proprety> {
    return await this.PropretyModel.findByIdAndUpdate(id, Proprety, {
      new: true,
    })
      .exec()
      .then((data) => data)
      .catch((err) => err);
  }

  async delete(id: string): Promise<any> {
    return await this.PropretyModel.findByIdAndRemove(id);
  }

  async findAvailables(): Promise<Proprety[]> {
    return await this.PropretyModel.find().exec();
  }

  async readManyById(propretiesIds: string): Promise<Proprety[]> {
    return await this.PropretyModel.find({
      _id: { $in: propretiesIds.split('plös') },
    }).exec();
  }

  async chakeAddress(address: string): Promise<any> {
    return this.PropretyModel.findOne({ address: address })
      .exec()
      .then((data) => data)
      .catch((err) => err);
  }

  async updateAll(data: any): Promise<any> {
    // Proprety.updateMany({}, [
    //   {
    //     $set: {
    //       "rentalInformation.address": { $toLower: "$rentalInformation.address" },
    //     },
    //   },
    // ])
    //   .limit(20)
    //   .then((data) => res.status(200).json(data))
    //   .catch((err) => res.status(404).json(err));
    return this.PropretyModel.updateMany({}, data)
      .then((data) => data)
      .catch((err) => err);
  }
}
