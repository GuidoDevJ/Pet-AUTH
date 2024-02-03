/* eslint-disable prettier/prettier */
import * as bcrypt from 'bcrypt';
const saltOrRounds = 10;

const hassPassword = (password: string) => {
  return bcrypt.hashSync(password, saltOrRounds);
};

const getHassPassword = (hassPasword, password) => {
  return bcrypt.compareSync(password, hassPasword);
};
export { hassPassword, getHassPassword };
