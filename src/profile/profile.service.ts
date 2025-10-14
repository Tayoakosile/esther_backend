import { Injectable } from '@nestjs/common';
import { AdminDocument } from 'src/users/schema/admin.schema';

@Injectable()
export class ProfileService {
  getProfile(user: AdminDocument) {
    console.log(user, ' profile:user');
    return user;
  }
}
