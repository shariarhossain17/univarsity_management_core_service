import { RedisClient } from '../../../shared/redis';
import { EVENT_STUDENT_CREATE } from './student.constant';
import { studentService } from './student.service';

const initStStudentEvents = () => {
  RedisClient.subClient(EVENT_STUDENT_CREATE, async (e: string) => {
    const data = JSON.parse(e);
    await studentService.createStudentFromEvent(data);
  });
};
export default initStStudentEvents;
