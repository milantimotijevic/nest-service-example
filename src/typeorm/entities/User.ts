import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserProfile } from './UserProfile';
import { Profiler } from 'inspector';
import { UserCredentials } from './UserCredentials';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    email: string;
    @Column()
    createdAt: Date;
    @OneToOne(() => UserProfile)
    @JoinColumn()
    profile: UserProfile;
    @OneToOne(() => UserCredentials)
    @JoinColumn()
    credentials: UserCredentials;
}