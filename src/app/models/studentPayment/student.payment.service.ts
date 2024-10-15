import { PrismaClient } from '@prisma/client';

type RestrictedPrismaClient = Omit<
  PrismaClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;
const makeStudentPayment = async (
  prismaClient: RestrictedPrismaClient,
  payload = {
    totalMoney: number,
    studentId: string,
    academicSemesterId: string,
  }
) => {};

export const makeStudentPaymentService = {
  makeStudentPayment,
};
