import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './users.schema';
import { Model } from 'mongoose';
import { signupData } from 'src/interfaces/users.type';

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
    return this.UserModel.findOne({ username: username }).exec();
  }

  async findOneByPhoneNumber(phoneNumber: string): Promise<User | undefined> {
    return this.UserModel.findOne({ phoneNumber: phoneNumber }).exec();
  }

  async findOneByMail(mail: string): Promise<User | undefined> {
    return this.UserModel.findOne({ mail: mail }).exec();
  }
}
