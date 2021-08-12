interface ICreateUser {
  name: string;
  username: string;
  email: string;
  driver_licenses: string;
  password: string;
  avatar?: string;
  id?: string;
}

export { ICreateUser };
