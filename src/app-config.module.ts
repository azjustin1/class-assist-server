import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from 'config/configuration';
import { RoleModule } from './modules/role/role.module';
import { UserModule } from './modules/user/user.module';
import { CommonModule } from './common/common.module';
import { QuizModule } from './modules/quiz/quiz.module';
import { ExerciseController } from './modules/exercise/exercise.controller';
import { ExerciseModule } from './modules/exercise/exercise.module';
import { ResultModule } from './modules/result/result.module';
import { ClassroomModule } from './modules/classroom/classroom.module';
import { FolderModule } from './modules/folder/folder.module';

const SYSTEM_MODULES = [UserModule, RoleModule, QuizModule, ExerciseModule];

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      load: [configuration],
      isGlobal: true,
    }),
    ...SYSTEM_MODULES,
    CommonModule,
    ExerciseModule,
    ResultModule,
    ClassroomModule,
    FolderModule,
  ],
  exports: [],
  controllers: [ExerciseController],
})
export class AppConfigModule {}
