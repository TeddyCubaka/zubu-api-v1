import { signupData } from 'src/interfaces/users.type';
import * as bcrypt from 'bcrypt';

type DatasStatusType = { passed: boolean; datasMissed: string[] };

export const signupDataValidator = (datas: signupData) => {
  const datasStatus: DatasStatusType = {
    passed: false,
    datasMissed: [],
  };
  if (!datas.mail || !datas.password || !datas.mail || !datas.phoneNumber)
    datasStatus.passed = false;
  else datasStatus.passed = true;
  if (!datas.username) datasStatus.datasMissed.push('username');
  if (!datas.password) datasStatus.datasMissed.push('password');
  if (!datas.mail) datasStatus.datasMissed.push('mail');
  if (!datas.phoneNumber) datasStatus.datasMissed.push('phoneNumber');

  return datasStatus;
};

export const getHashPassword = async (password: string): Promise<string> => {
  const saltOrRounds = 10;
  const hash = await bcrypt.hash(password, saltOrRounds);
  return hash;
};

export const verifyPassord = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
};
