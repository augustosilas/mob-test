import { Module } from '@nestjs/common';
import { VehicleControllers } from '../controllers/vehicle.controllers';
import { VehicleService } from '../services/vehicle.service';
import { TrackingVehicleProvider } from '../providers/tracking-vehicle.provider';

@Module({
  controllers: [VehicleControllers],
  providers: [VehicleService, TrackingVehicleProvider],
  exports: [VehicleService],
})
export class VehicleModule {}
