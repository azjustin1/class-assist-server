import { CommonEntity } from 'src/common/entity/base-entity.entity';
import { Exercise } from 'src/modules/exercise/entity/exercise.entity';
import { User } from 'src/modules/user/entity/user.entity';
import { BeforeInsert, Column, Entity, ManyToOne, OneToMany } from 'typeorm';

const ATTEND_CODE_LENGTH = 6;

@Entity()
export class Classroom extends CommonEntity {
  @Column()
  name: string;

  @Column({
    unique: true,
  })
  code: string;

  @ManyToOne(() => User)
  createdUser: User;

  @OneToMany(() => User, (user) => user)
  students: User[];

  @OneToMany(() => Exercise, (exercise) => exercise)
  exercises: Exercise[];

  @BeforeInsert()
  generateClassCode() {
    this.code = this.generateRandomCode();
  }

  private generateRandomCode(): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (let i = 0; i < ATTEND_CODE_LENGTH; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }

    return result;
  }
}
