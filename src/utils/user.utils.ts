import { signupData } from 'src/interfaces/users.type';

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
