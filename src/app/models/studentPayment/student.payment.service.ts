import { PrismaClient } from '@prisma/client';

type RestrictedPrismaClient = Omit<
  PrismaClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;
const makeStudentPayment = async (
  prismaClient: RestrictedPrismaClient,
  payload: {
    totalMoney: number;
    studentId: string;
    academicSemesterId: string;
  }
) => {
  const paymentData = {
    studentId: payload.studentId,
    academicSemesterId: payload.academicSemesterId,
    fullPayment: payload.totalMoney,
    partialPayment: payload.totalMoney * 0.5,
    totalDuePayment: payload.totalMoney,
    totalPaidPayment: 0,
  };

  await prismaClient.studentSemesterPayment.create({
    data: paymentData,
  });
};

export const makeStudentPaymentService = {
  makeStudentPayment,
};
