import Cookies from "js-cookie";
import { useUser } from "./UserProvider";

export interface OkResponse {
  sessionKey: string;
}

export interface ErrResponse {
  code: SignInErrCode | SignUpErrCode;
  field: "username" | "password";
  message: string;
}

type SignUpErrCode =
    "USERNAME_TAKEN" |
    "USERNAME_TOO_SHORT" |
    "PASSWORD_TOO_SHORT" |
    "SIGNUP_FAILED"

type SignInErrCode =
    "INVALID_PASSWORD" |
    "INVALID_USERNAME" |
    "SIGNUP_FAILED"
