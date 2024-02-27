import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user_credentials' })
export class UserCredentials {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    salt: string;
    @Column()
    password: string;
}