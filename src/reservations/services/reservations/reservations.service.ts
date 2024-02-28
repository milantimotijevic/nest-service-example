import { Injectable } from '@nestjs/common';

const reservations = [
    {
        id: 0,
        location: 'Zlatibor',
        numOfPeople: 4,
        startDate: new Date('3 March 2024'),
        endDate: new Date('13 March 2024'),
    },
    {
        id: 1,
        location: 'Belgrade',
        numOfPeople: 1,
        startDate: new Date('6 March 2024'),
        endDate: new Date('19 March 2024'),
    },
    {
        id: 2,
        location: 'Rogaca',
        numOfPeople: 10,
        startDate: new Date('1 May 2024'),
        endDate: new Date('2 May 2024'),
    }
];

@Injectable()
export class ReservationsService {
    async getReservations() {
        return reservations;
    }

    async getReservationById(id: number) {
        return reservations[id];
    }
}
