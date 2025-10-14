import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { User, AdminSchema } from 'src/users/schema/user.schema';
import { InvitesController } from './invites.controller';
import { InvitesService } from './invites.service';
import { Invite, InviteSchema } from './schemas/invite.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: User.name, schema: AdminSchema },
      { name: Invite.name, schema: InviteSchema },
    ]),
  ],
  controllers: [InvitesController],
  providers: [InvitesService],
})
export class InvitesModule {}
