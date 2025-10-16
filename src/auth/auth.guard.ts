import { Injectable } from '@nestjs/common';
// import bcrypt from 'bcrypt';
import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schema/user.schema';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    console.log('token :', token);

    try {
      const payload = await this.jwtService.verifyAsync<{ id: string }>(token);
      console.log('payload :', payload);

      const user = await this.userModel
        .findById(payload.id)
        .populate('invites')
        .populate({
          path: 'invited_by',
          select: 'name email role',
        })
        .populate({
          path: 'employees',
          // select:
          //   ' -__v -invites -employees -can_invite -is_verified -invited_by',
        });
      // .select(' -__v role');
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      const { password: _unused, ...rest } = user.toObject();

      request['user'] = rest;
    } catch (error) {
      console.log('error :', error);
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
