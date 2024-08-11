import { Prisma } from '@prisma/client';
import { IGenericErrorMessage } from '../interface/error';

const handleClientError = (error: Prisma.PrismaClientKnownRequestError) => {
  console.log(error.message);
  const errors: IGenericErrorMessage[] = [];
  let message = '';
  const statusCode = 400;

  if (
    error.code == 'P2025' &&
    error.message.includes('prisma.semesterRegistration.delete()')
  ) {
    message = 'no semester found';
  }
  return {
    statusCode,
    message: message,
    errorMessages: errors,
  };
};

export default handleClientError;
