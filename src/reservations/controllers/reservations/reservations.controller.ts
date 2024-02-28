import { Controller, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe } from '@nestjs/common';
import { ReservationsService } from '../../services/reservations/reservations.service';

@Controller('reservations')
export class ReservationsController {

    constructor(private reservationsService: ReservationsService) {}

    @Get()
    async getAllReservations() {
        return this.reservationsService.getReservations();
    }

    @Get(':id')
    async getReservationById(@Param('id', ParseIntPipe) id: number) {
        const reservation = await this.reservationsService.getReservationById(id);

        if (!reservation) {
            throw new HttpException(`Reservation with id ${id} does not exist`, HttpStatus.NOT_FOUND);
        }

        return reservation;
    }
}
