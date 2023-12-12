import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { CommonEntity } from 'src/common/entity/base-entity.entity';
import { Classroom } from 'src/modules/classroom/entities/classroom.entity';
import { Role } from 'src/modules/role/entity/role.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User extends CommonEntity {
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
    nullable: true,
  })
  refreshToken?: string;

  @OneToOne(() => Role)
  @JoinColumn()
  role: Role;

  @OneToMany(() => Classroom, (classroom) => classroom, {
    cascade: true,
  })
  classrooms: Classroom[];
}
