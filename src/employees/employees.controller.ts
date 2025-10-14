import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserDocument } from 'src/users/schema/user.schema';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get('/')
  @UseGuards(AuthGuard)
  getEmployees(@Request() req: { user: UserDocument }) {
    return this.employeesService.getAllEmployees(req.user);
  }
  @Get('/:id')
  @UseGuards(AuthGuard)
  getSingleEmployee(@Param('id') id: string) {
    return this.employeesService.getSingleEmployee(id);
  }
}
