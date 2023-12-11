import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { Role } from 'src/modules/role/entity/role.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  phone: string;

  @Column({
    nullable: true
  })
  refreshToken?: string;

  @OneToOne(() => Role)
  @JoinColumn()
  role: Role;
}
