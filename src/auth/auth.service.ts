import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}
  async createAccount(body) {
    const { email, password } = body;

    // Check if email already exists
    const existing = await this.userModel.findOne({ email });
    if (existing) {
      throw new BadRequestException('Email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save admin

    const createdUser = new this.userModel({
      ...body,
      password: hashedPassword,
      role: 'admin',
    });
    await createdUser.save();
    return { message: 'Account created successfully' };
  }
  async loginAccount(body: { email: string; password: string }) {
    const { email, password } = body;

    // Find admin by email
    const admin = await this.userModel.findOne({ email });
    if (!admin) {
      throw new BadRequestException('Invalid email or password');
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid email or password');
    }
    const token = this.jwtService.sign({
      id: admin._id,
      email: admin.email,
    });
    return { message: 'Login successful', token };
  }
}
