import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schema/user.schema';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}
  async createAccount(body: CreateAdminDto) {
    const { email, password } = body;

    const existing = await this.userModel.findOne({ email });
    if (existing) {
      throw new BadRequestException('Email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = new this.userModel({
      ...body,
      password: hashedPassword,
      role: 'admin',
    });
    await createdUser.save();
    return { message: 'Account created successfully', user: createdUser };
  }

  async loginAccount(body: { email: string; password: string }) {
    const { email, password } = body;

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid email or password');
    }
    const token = this.jwtService.sign({
      id: user._id,
      email: user.email,
    });
    return { message: 'Login successful', token, user_role: user.role };
  }
}
