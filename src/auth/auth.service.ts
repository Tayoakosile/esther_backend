import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  createAccount(body: any): string {
    console.log('body :', body);

    const condition = false; // Replace with your actual condition
    if (condition) {
      throw new BadRequestException('Error Here');
    } else {
      return 'Hello World!';
    }
  }
}
