import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CompanyRepository } from '../repositories/company.repository';
import { VehicleRepository } from '../repositories/vehicle.repository';
import { TrackingVehicleProvider } from '../providers/tracking-vehicle.provider';

@Injectable()
export class VehicleService {
  constructor(
    private readonly vehicleRepository: VehicleRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly trackingVehicleProvider: TrackingVehicleProvider,
  ) {}

  async create(dto: {
    companyId: number;
    license: string;
    vin: string;
    lat?: number;
    long?: number;
    fuelLevel?: number;
  }) {
    const company = await this.companyRepository.findById(dto.companyId);
    if (!company)
      throw new HttpException(
        { msg: 'company.error.not_found' },
        HttpStatus.NOT_FOUND,
      );
    const vehicle = await this.vehicleRepository.findByVinAndCompanyId({
      vin: dto.vin,
      companyId: dto.companyId,
    });
    if (vehicle)
      throw new HttpException(
        { msg: 'vehicle.error.already_exists_with_vin' },
        HttpStatus.BAD_REQUEST,
      );
    const createdVehicle = await this.vehicleRepository.save({
      companyId: dto.companyId,
      license: dto.license,
      vin: dto.vin,
      fuelLevel: dto.fuelLevel,
      lat: dto.lat,
      long: dto.long,
    });

    try {
      await this.trackingVehicleProvider.createVehicle({
        companyId: dto.companyId,
        vin: createdVehicle.vin,
        fuelLevel: createdVehicle.fuelLevel,
      });
      createdVehicle.trackingEnabled = true;
    } catch (error) {
      createdVehicle.trackingEnabled = false;
    }
    await this.vehicleRepository.update(createdVehicle.id, {
      trackingEnabled: createdVehicle.trackingEnabled,
    });
    return createdVehicle;
  }

  async delete(dto: { companyId: number; vehicleId: number }) {
    const vehicle = await this.vehicleRepository.findById(dto.vehicleId);
    if (!vehicle)
      throw new HttpException(
        { msg: 'vehicle.error.not_found' },
        HttpStatus.NOT_FOUND,
      );
    await this.vehicleRepository.softDelete(dto.vehicleId);
    try {
      await this.trackingVehicleProvider.deleteVehicle({
        companyId: dto.companyId,
        vin: vehicle.vin,
      });
    } catch (error) {}
  }

  async findById(vehicleId: number) {
    const vehicle = await this.vehicleRepository.findById(vehicleId);
    if (!vehicle)
      throw new HttpException(
        { msg: 'vehicle.error.not_found' },
        HttpStatus.NOT_FOUND,
      );
    return vehicle;
  }

  async update(dto: {
    vehicleId: number;
    vin?: string;
    license?: string;
    latitude?: number;
    longitude?: number;
    fuelLevel?: number;
  }) {
    const vehicle = await this.vehicleRepository.findById(dto.vehicleId);
    if (!vehicle)
      throw new HttpException(
        { msg: 'vehicle.error.not_found' },
        HttpStatus.NOT_FOUND,
      );
    vehicle.lat = dto.latitude ?? vehicle.lat;
    vehicle.long = dto.longitude ?? vehicle.long;
    vehicle.fuelLevel = dto.fuelLevel ?? vehicle.fuelLevel;
    vehicle.vin = dto.vin ?? vehicle.vin;
    vehicle.license = dto.license ?? vehicle.license;
    await this.vehicleRepository.update(dto.vehicleId, vehicle);
  }

  async findAll(dto: { companyId: number; limit?: number; page?: number }) {
    return this.vehicleRepository.findAll(dto);
  }

  async updateTracking(dto: {
    vin: string;
    latitude: number;
    longitude: number;
  }) {
    const vehicle = await this.vehicleRepository.findByVin(dto.vin);
    if (!vehicle)
      throw new HttpException(
        { msg: 'vehicle.error.not_found_vehicle_with_vin' },
        HttpStatus.NOT_FOUND,
      );
    vehicle.lat = dto.latitude ?? vehicle.lat;
    vehicle.long = dto.longitude ?? vehicle.long;
    await this.vehicleRepository.update(vehicle.id, vehicle);
  }
}
