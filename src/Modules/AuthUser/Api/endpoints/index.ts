import {AxiosInstance} from "../axios";
import {User} from "../../../../App/Types";
import {AxiosResponse} from "axios";

interface registrationData {
  "email": string
  "password": string
  "firstName": string
  "lastName": string
}
interface loginData {
  "email": string
  "password": string
}
interface forgotPasswordData {
  email: string
}
interface updateProfileData {
  "firstName": string
  "lastName": string
}
interface LoginResponse {
  token: string
  user: User
}
const Endpoints = {
  registration: (data: registrationData):Promise<{data: LoginResponse}> => AxiosInstance.post("/v1/auth/email/register", data),
  login: (data: loginData):Promise<{data: LoginResponse}> => AxiosInstance.post("/v1/auth/email/login", data),
  forgotPassword: (data: forgotPasswordData) => AxiosInstance.post("/v1/auth/forgot/password", data),
  getProfile: ():Promise<AxiosResponse<User>> => AxiosInstance.get("/v1/auth/me"),
  updateProfile: (data: updateProfileData) => AxiosInstance.patch("/v1/auth/me", data),
};

export default Endpoints
