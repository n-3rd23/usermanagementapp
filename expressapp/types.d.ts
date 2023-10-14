declare namespace Express {
  export interface Request {
    user: {
      email: string;
      name: string;
      id: number;
      role_id: number;
    };
  }
  export interface Response {
    user: any;
  }
}
