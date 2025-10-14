import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProfileService } from './profile.service';
import { AdminDocument } from 'src/users/schema/admin.schema';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  @Get('/')
  @UseGuards(AuthGuard)
  getProfile(@Request() req: { user: AdminDocument }) {
    return this.profileService.getProfile(req.user);
  }
}
