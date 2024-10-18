import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserCreateDTO } from './dto/create-user.dto';
import { UserService } from '../services/user.service';
import { UpdateUserDTO } from './dto/update-user.dto';
import { FindAllFilterDTO } from './dto/find-all-filter.dto';
import { AuthGuard } from '../security/guards/auth.guard';
import { Roles } from '../security/role.decorator';
import { RoleType } from '../security/role-type';
import { RolesGuard } from '../security/guards/roles.guard';
import { AuthUser } from '../security/user.decorator';
import { User } from '../entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard, RolesGuard)
@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth('Bearer')
  @Roles(RoleType.ADMIN)
  @Post()
  async create(
    @Body() body: UserCreateDTO,
    @Query('companyId') companyId: string,
  ) {
    const user = await this.userService.create({
      companyId: +companyId,
      ...body,
    });
    return user;
  }

  @ApiBearerAuth('Bearer')
  @Patch()
  @Roles(RoleType.ADMIN, RoleType.USER)
  async update(@Body() body: UpdateUserDTO, @AuthUser() authUser: User) {
    await this.userService.update({ ...body, userId: authUser.id });
  }

  @ApiBearerAuth('Bearer')
  @Delete()
  @Roles(RoleType.ADMIN)
  async delete(@AuthUser() authUser: User) {
    await this.userService.delete(authUser.id);
  }

  @ApiBearerAuth('Bearer')
  @Get('/findAll')
  async findAll(@Query() query: FindAllFilterDTO, @AuthUser() authUser: User) {
    return this.userService.findAll({
      companyId: authUser.companyId,
      limit: !query.limit || query.limit === '0' ? 1 : +query.limit,
      page: !query.page || query.page === '0' ? 1 : +query.page,
    });
  }

  @ApiBearerAuth('Bearer')
  @Get()
  async findById(@AuthUser() authUser: User) {
    const user = await this.userService.findById(authUser.id);
    if (user) delete user.password;
    return user;
  }
}
