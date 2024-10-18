import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from '../services/company.service';
import { CreateCompanyDTO } from './dto/create-company.dto';
import { UpdateCompanyDTO } from './dto/update-company.dto';
import { AuthGuard } from '../security/guards/auth.guard';
import { RolesGuard } from '../security/guards/roles.guard';
import { Roles } from '../security/role.decorator';
import { RoleType } from '../security/role-type';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserMainGuard } from '../security/guards/user-main.guard';

@Controller('companies')
@ApiTags('Company')
@UseGuards(AuthGuard, RolesGuard, UserMainGuard)
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
  @ApiBearerAuth()
  @Post()
  @Roles(RoleType.ADMIN)
  async create(@Body() body: CreateCompanyDTO) {
    return this.companyService.create(body);
  }

  @ApiBearerAuth()
  @Patch(':companyId')
  @Roles(RoleType.ADMIN)
  async update(
    @Body() body: UpdateCompanyDTO,
    @Param('companyId') companyId: number,
  ) {
    return this.companyService.update({
      companyId,
      ...body,
    });
  }

  @ApiBearerAuth()
  @Get(':companyId')
  async find(@Param('companyId') companyId: number) {
    return this.companyService.findById(companyId);
  }

  @ApiBearerAuth()
  @Delete(':companyId')
  @Roles(RoleType.ADMIN)
  async delete(@Param('companyId') companyId: number) {
    return this.companyService.delete(companyId);
  }
}
