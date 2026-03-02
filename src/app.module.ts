import { Module } from '@nestjs/common';
import { MissionService } from './mission/mission.service';
import { MissionModule } from './mission/mission.module';

@Module({
  imports: [MissionService, MissionModule],
  controllers: [],
  providers: [],
})