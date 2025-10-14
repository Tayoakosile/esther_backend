import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, AdminSchema } from 'src/users/schema/user.schema';
import { ProfileService } from './profile.service';

import { ProfileController } from './profile.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: AdminSchema }]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
