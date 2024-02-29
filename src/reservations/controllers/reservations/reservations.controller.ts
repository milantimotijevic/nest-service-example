import { Controller, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ReservationsService } from '../../services/reservations/reservations.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('reservations')
export class ReservationsController {

    constructor(private reservationsService: ReservationsService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async getAllReservations() {
        return this.reservationsService.getReservations();
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    async getReservationById(@Param('id', ParseIntPipe) id: number) {
        const reservation = await this.reservationsService.getReservationById(id);

        if (!reservation) {
            throw new HttpException(`Reservation with id ${id} does not exist`, HttpStatus.NOT_FOUND);
        }

        return reservation;
    }
}
