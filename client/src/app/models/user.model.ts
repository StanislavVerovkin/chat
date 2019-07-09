export interface UserModel {
  email: string;
  password: string;
  isLogin: boolean;
  name?: string;
  _id?: string;
  token?: string;
}
