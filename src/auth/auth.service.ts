import { BadRequestException, Injectable } from '@nestjs/common';
// import bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { Admin, AdminDocument } from 'src/users/schema/admin.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private readonly jwtService: JwtService,
  ) {}
  async createAccount(body) {
    const { email, password } = body;

    // Check if email already exists
    const existing = await this.adminModel.findOne({ email });
    if (existing) {
      throw new BadRequestException('Email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save admin

    const createdUser = new this.adminModel({
      ...body,
      password: hashedPassword,
    });
    await createdUser.save();
    return { message: 'Account created successfully' };
  }
  async loginAccount(body: { email: string; password: string }) {
    const { email, password } = body;

    // Find admin by email
    const admin = await this.adminModel.findOne({ email });
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
