import { User } from "@app/models/backend/user";

//Se está poniendo un alias, se está creando una nueva interfaz de modelo que se llama user response
export {User as UserResponse} from '@app/models/backend/user';


export interface EmailPasswordCredentials{
  email : string;
  password: string;
}


//Se le agrega el campo password ya con toda la interface de User
export interface UserRequest extends User{
  password : string
}


//Para ignorar el token y id
export type UserCreateRequest = Omit<UserRequest, 'token'| 'id'>;

