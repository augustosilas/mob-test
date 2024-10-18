import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TrackingVehicleProvider {
  private BASE_URL = process.env.URL_TRACKING_VEHICLE;
  async createVehicle(dto: {
    companyId: number;
    vin: string;
    fuelLevel?: number;
  }) {
    const url = `${this.BASE_URL}/vehicles?companyRef=${dto.companyId}`;
    await axios(url, {
      method: 'POST',
      data: {
        vin: dto.vin,
        fuelLevel: dto.fuelLevel,
      },
    });
  }

  async deleteVehicle(dto: { vin: string; companyId: number }) {
    const url = `${this.BASE_URL}/vehicles/${dto.vin}?companyRef=${dto.companyId}`;
    await axios.delete(url);
  }
}
