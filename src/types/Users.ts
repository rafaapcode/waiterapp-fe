export interface Users {
  id: string;
  name: string;
  email: string;
  role: UserRoles;
}

export enum UserRoles {
  CLIENT = 'CLIENT',
  WAITER = 'WAITER',
  ADMIN = 'ADMIN',
}
