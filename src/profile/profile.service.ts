import { Injectable } from '@nestjs/common';
import { UserDocument } from 'src/users/schema/user.schema';

@Injectable()
export class ProfileService {
  getProfile(user: UserDocument) {
    return user;
  }
}
