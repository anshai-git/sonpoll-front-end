import {ApiResponse} from '../api/ApiResponse';
import {User} from '../model/User';

export type SignUpResponse = ApiResponse<Partial<User>>;
