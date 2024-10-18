import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { VehicleService } from '../services/vehicle.service';
import { CreateVehicleDTO } from './dto/create-vehicle.dto';
import { UpdateVehicleDTO } from './dto/update-vehicle.dto';
import { FindAllFilterDTO } from './dto/find-all-filter.dto';
import { UpdateTrackingDTO } from './dto/update-tracking.dto';
import { AuthGuard } from '../security/guards/auth.guard';
import { RoleType } from '../security/role-type';
import { Roles } from '../security/role.decorator';
import { RolesGuard } from '../security/guards/roles.guard';
import { AuthUser } from '../security/user.decorator';
import { User } from '../entities/user.entity';
import { BasicAuth } from '../security/guards/basic-auth.guard';
import { ApiBasicAuth, ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard, RolesGuard)
@Controller('vehicles')
@ApiTags('Vehicle')
export class VehicleControllers {
  constructor(private readonly vehicleService: VehicleService) {}

  @ApiBearerAuth('Bearer')
  @Post()
  @Roles(RoleType.ADMIN)
  async create(@Body() body: CreateVehicleDTO, @AuthUser() authUser: User) {
    return this.vehicleService.create({
      ...body,
      companyId: authUser.companyId,
    });
  }

  @ApiBearerAuth('Bearer')
  @Delete(':vehicleId')
  @Roles(RoleType.ADMIN)
  @UseGuards(AuthGuard)
  async delete(
    @AuthUser() authUser: User,
    @Param('vehicleId') vehicleId: number,
  ) {
    await this.vehicleService.delete({
      vehicleId,
      companyId: authUser.companyId,
    });
  }

  @ApiBearerAuth('Bearer')
  @Get('/findAll')
  @UseGuards(AuthGuard)
  async findAll(@AuthUser() authUser: User, @Query() query: FindAllFilterDTO) {
    return this.vehicleService.findAll({
      companyId: authUser.companyId,
      limit: !query.limit || query.limit === '0' ? 1 : +query.limit,
      page: !query.page || query.page === '0' ? 1 : +query.page,
    });
  }

  @ApiBearerAuth('Bearer')
  @Get(':vehicleId')
  @UseGuards(AuthGuard)
  async findById(@Param('vehicleId') vehicleId: number) {
    return this.vehicleService.findById(+vehicleId);
  }

  @ApiBasicAuth('Basic')
  @Patch('tracking')
  @UseGuards(BasicAuth)
  async updateTracking(@Body() body: UpdateTrackingDTO) {
    await this.vehicleService.updateTracking(body);
  }

  @ApiBearerAuth('Bearer')
  @Patch(':vehicleId')
  @Roles(RoleType.ADMIN)
  @UseGuards(AuthGuard)
  async update(
    @Body() body: UpdateVehicleDTO,
    @Param('vehicleId') vehicleId: number,
  ) {
    await this.vehicleService.update({ ...body, vehicleId: +vehicleId });
  }
}
