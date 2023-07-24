import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserDTO } from '../dto/user.dto';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  phone: string;
}
