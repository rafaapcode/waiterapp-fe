export interface NewUserData {
  name: string;
  email: string;
  password: string;
}


export interface UserData {
  email: string;
  name: string;
  password: string;
  role: "ADMIN" | "WAITER";
}
