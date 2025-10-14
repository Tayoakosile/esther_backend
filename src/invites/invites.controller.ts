import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { InvitesService } from './invites.service';

@Controller('invites')
export class InvitesController {
  constructor(private readonly invitesService: InvitesService) {}

  @Post('/')
  @UseGuards(AuthGuard)
  createInvite(@Request() req) {
    return this.invitesService.createInvite(req.user);
  }

  @Get('/')
  @UseGuards(AuthGuard)
  getInvites(@Request() req) {
    return this.invitesService.getInvites(req.user);
  }

  @Get('/:id')
  getSingleInvite(@Param('id') id: string) {
    return this.invitesService.getSingleInvite(id);
  }
  @Post('/:id/use')
  createEmployee(@Body() CreateEmployeeDto, @Param('id') id: string) {
    return this.invitesService.useInvite(id, CreateEmployeeDto);
  }
}
