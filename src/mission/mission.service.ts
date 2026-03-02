import { Injectable } from '@nestjs/common';
import { IMission } from './mission.interface';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MissionService {
  private readonly missionsMock = [
    { id: 1, codename: 'OPERATION_STORM', status: 'ACTIVE' },
    { id: 2, codename: 'SILENT_SNAKE', status: 'COMPLETED' },
    { id: 3, codename: 'RED_DAWN', status: 'FAILED' },
    { id: 4, codename: 'BLACKOUT', status: 'ACTIVE' },
    { id: 5, codename: 'ECHO_FALLS', status: 'COMPLETED' },
    { id: 6, codename: 'GHOST_RIDER', status: 'COMPLETED' }
  ];

  getSummary() {
    let active = 0;
    let completed = 0;
    let failed = 0;
    for (let i = 0; i < this.missionsMock.length; i++) {
      if (this.missionsMock[i].status === 'ACTIVE') active++;
      if (this.missionsMock[i].status === 'COMPLETED') completed++;
      if (this.missionsMock[i].status === 'FAILED') failed++;
    }
    return { ACTIVE: active, COMPLETED: completed, FAILED: failed };
  }

  findAll() {
    const filePath = path.join(process.cwd(), 'data', 'missions.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const allData = JSON.parse(fileData);
    const finalMissions = [];

    for (let i = 0; i < allData.length; i++) {
      const mission = allData[i];
      let days = -1; 

      if (mission.endDate !== null) {
        const start = new Date(mission.startDate);
        const end = new Date(mission.endDate);
        const diffTime = end.getTime() - start.getTime();
        const oneDay = 1000 * 60 * 60 * 24;
        days = diffTime / oneDay;
      }

      const newObj = {
        id: mission.id,
        codename: mission.codename,
        status: mission.status,
        targetName: mission.targetName,
        riskLevel: mission.riskLevel,
        startDate: mission.startDate,
        endDate: mission.endDate,
        durationDays: days 
      };

      finalMissions.push(newObj);
    }

    return finalMissions;
  }
}