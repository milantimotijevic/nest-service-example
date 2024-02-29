import { Controller, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Req, UseGuards } from '@nestjs/common';
import { ReservationsService } from '../../services/reservations/reservations.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('reservations')
export class ReservationsController {

    constructor(private reservationsService: ReservationsService) {}

    @Get()
    // this whole module can use auth stuff because the app module already imports the whole auth module
    @UseGuards(AuthGuard('jwt'))
    async getAllReservations(@Req() req: Request) {
        console.log(req.user)
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
