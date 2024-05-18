import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PatientService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createPatientDto: Prisma.PatientCreateInput) {
    return this.databaseService.patient.create({data: createPatientDto});
  }

  async findAll() {
    return this.databaseService.patient.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.patient.findUnique({
      where: {
        id,
      }
    });
  }

  async update(id: number, updatePatientDto: Prisma.PatientUpdateInput) {
    return this.databaseService.patient.update({
      where: {
        id,
      },
      data: updatePatientDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.patient.delete({
      where: {
        id,
      }
    })
  }
}
