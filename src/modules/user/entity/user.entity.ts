import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserDTO } from '../dto/user.dto';
import { Exclude } from 'class-transformer';
import { Role } from 'src/modules/role/entity/role.entity';
import { IsEmail } from 'class-validator';

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

  @Column()
  refreshToken: string;

  @OneToOne(() => Role)
  @JoinColumn()
  role: Role;
}
