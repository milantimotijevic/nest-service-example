import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserProfile } from './UserProfile';
import { Profiler } from 'inspector';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username: string;
    @Column({
        nullable: true,
    })
    salt?: string;
    @Column({
        nullable: true,
    })
    password?: string;
    @Column()
    createdAt: Date;
    @OneToOne(() => UserProfile)
    @JoinColumn()
    profile: UserProfile;
}