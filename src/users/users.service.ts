import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './users.schema';
import { Model, Types } from 'mongoose';
import { signupData } from '../interfaces/users.type';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  async create(validDatas: signupData): Promise<User> {
    const newUser = new this.UserModel(validDatas);
    return newUser
      .save()
      .then((data) => data)
      .catch((err) => {
        if (err.code === 11000)
          return {
            message: 'Le nom ou le mail ou le numéro de téléphone déjà pris.',
            err,
          };
        else return err;
      });
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    const options = {
      path: 'propreties',
      model: 'Proprety',
      strictPopulate: false, // Ignorer l'erreur si la référence n'existe pas dans le schéma
    };
    return await this.UserModel.findOne({ username: username })
      .populate(options)
      .exec();
  }

  async findOneByPhoneNumber(phoneNumber: string): Promise<User | undefined> {
    const options = {
      path: 'propreties',
      model: 'Proprety',
      strictPopulate: false, // Ignorer l'erreur si la référence n'existe pas dans le schéma
    };
    return await this.UserModel.findOne({ phoneNumber: phoneNumber })
      .populate(options)
      .exec();
  }

  async findOneByMail(mail: string): Promise<User | undefined> {
    const options = {
      path: 'propreties',
      model: 'Proprety',
      strictPopulate: false, // Ignorer l'erreur si la référence n'existe pas dans le schéma
    };
    return await this.UserModel.findOne({ mail: mail })
      .populate(options)
      .exec();
    // .populate('role', '', this.)
  }

  async findOneById(_id: string): Promise<User | undefined> {
    const options = {
      path: 'propreties',
      model: 'Proprety',
      strictPopulate: false, // Ignorer l'erreur si la référence n'existe pas dans le schéma
    };
    return await this.UserModel.findOne({
      _id: new Types.ObjectId(_id),
    })
      .populate(options)
      .exec();
  }

  async getAll(): Promise<User[]> {
    return await this.UserModel.find().exec();
  }

  async update(userId: string, body: any): Promise<any> {
    return await this.UserModel.findByIdAndUpdate(userId, body, {
      new: true,
    })
      .exec()
      .then((data) => {
        return { data, body };
      })
      .catch((err) => err);
  }

  async addToFavoritePropreties(
    propretyId: string,
    userId: string,
  ): Promise<any> {
    const user = await this.UserModel.findOne({
      _id: new Types.ObjectId(userId),
    }).exec();
    if (user == null) {
      return { message: 'utilisateur non trouvé' };
    }
    if (user.savedPropreties.indexOf(propretyId) == -1)
      user.savedPropreties.push(propretyId);
    return await this.UserModel.findByIdAndUpdate(userId, user, {
      new: true,
    })
      .exec()
      .then((data) => {
        return { data, user };
      })
      .catch((err) => err);
  }

  async removeToFavoritePropreties(
    propretyId: string,
    userId: string,
  ): Promise<any> {
    const user = await this.UserModel.findOne({
      _id: new Types.ObjectId(userId),
    }).exec();
    if (user == null) {
      return { message: 'utilisateur non trouvé' };
    }
    user.savedPropreties = user.savedPropreties.filter((proprety) => {
      return proprety !== propretyId;
    });
    return await this.UserModel.findByIdAndUpdate(userId, user, {
      new: true,
    })
      .exec()
      .then((data) => {
        return { data, user };
      })
      .catch((err) => err);
  }

  async addCreateProprety(propretyId: string, userId: string): Promise<any> {
    const user = await this.UserModel.findOne({
      _id: new Types.ObjectId(userId),
    }).exec();
    if (user == null) {
      return { message: 'utilisateur non trouvé' };
    }
    if (user.propreties.indexOf(new Types.ObjectId(propretyId)) == -1)
      user.propreties.push(new Types.ObjectId(propretyId));
    return await this.UserModel.findByIdAndUpdate(userId, user, {
      new: true,
    })
      .exec()
      .then((data) => {
        return { data, user };
      })
      .catch((err) => err);
  }
}
