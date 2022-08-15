import { RowDataPacket } from 'mysql2';
import { Student, Message } from '../types';

const mapToMessage = (rows: RowDataPacket[]): Message[] => {
    const result: Message[] = [];

    rows.forEach(
        ({
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
            result.push(message);
        }
    );

    return result;
};

export default mapToMessage;
