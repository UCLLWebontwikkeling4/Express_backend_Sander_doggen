import { RowDataPacket } from 'mysql2';
import { Student, Message } from '../types';

const mapToStudents = (rows: RowDataPacket[]): Student[] => {
    const result: Student[] = [];

    rows.forEach(
        ({
            student_id,
            student_name,
            student_status,
            message_id,
            message_author,
            message_date,
            message_text
        }) => {
            const message: Message = {
                id: message_id,
                author: message_author,
                date: message_date,
                text: message_text,
            };
            const student: Student = { id: student_id, name: student_name, status: student_status, messages: [message] };

            const existing = result.find((el) => el.id === student_id);
            if (!existing) {
                result.push(student);
            } else {
                existing.messages.push(message);
            }
        }
    );

    return result;
};

const mapToStudentsList = (rows: RowDataPacket[]): Student[] => {
    const result= [];

    rows.forEach(
        ({
            student_name,
            student_status
            
        }) => {
            
            const student  = { name: student_name,status: student_status };
                result.push(student);
        }
    );

    return result;
};

export {mapToStudents, mapToStudentsList}
