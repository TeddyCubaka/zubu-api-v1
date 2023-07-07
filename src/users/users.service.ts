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
    return await this.UserModel.findOne({ username: username }).exec();
  }

  async findOneByPhoneNumber(phoneNumber: string): Promise<User | undefined> {
    return await this.UserModel.findOne({ phoneNumber: phoneNumber }).exec();
  }

  async findOneByMail(mail: string): Promise<User | undefined> {
    return await this.UserModel.findOne({ mail: mail }).exec();
  }

  async findOneById(_id: string): Promise<User | undefined> {
    return await this.UserModel.findOne({
      _id: new Types.ObjectId(_id),
    }).exec();
  }

  async getAll(): Promise<User[]> {
    return await this.UserModel.find().exec();
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
}
