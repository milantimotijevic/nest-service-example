import { Module } from '@nestjs/common';
import { ReservationsController } from './controllers/reservations/reservations.controller';
import { ReservationsService } from './services/reservations/reservations.service';

@Module({
  controllers: [ReservationsController],
  providers: [ReservationsService]
})
export class ReservationsModule {}
