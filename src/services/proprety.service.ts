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
      .catch((err) => err);
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
    }).exec();
  }

  async delete(id: string): Promise<any> {
    return await this.PropretyModel.findByIdAndRemove(id);
  }
}
