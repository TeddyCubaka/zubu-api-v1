import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Proprety, PropretyDocument } from '../schemas/proprety.schema';

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
    return this.PropretyModel.updateMany(
      {},
      {
        $rename: {
          'rentalInformation.monentaryCurrency':
            'rentalInformation.monetaryCurrency',
        },
      },
    )
      .exec()
      .then((data) => data)
      .catch((err) => err);
  }
}
