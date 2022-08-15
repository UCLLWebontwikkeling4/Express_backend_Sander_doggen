import { OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import mapToMessage from './message-mapper';
import { Message } from '../types';
import { connectionPool } from '../database';

const getMessages = async (onResult: (error: Error, messages: Message[]) => void) => {
    const query = `SELECT id AS message_id, author AS message_author, datum as message_date, text as message_text
  FROM web4.message AS m 
  LIMIT 5`;

    /**
     * You can avoid a try/catch block by wrapping the logic into an IIFE (immediately invoked function expression):
     *  (async () => {
     *      const rows = await connectionPool.query(query);
     *      onResult(null, mapToLecturers(rows));
     *  })().catch((err) => onResult(err));
     */
    try {
        const [rows] = await connectionPool.query(query);
        onResult(null, mapToMessage(<RowDataPacket[]>rows));
    } catch (error) {
        onResult(error, null);
    }
};

const getMessage = async (
    messageId: number,
    onResult: (error: Error, message: Message) => void
) => {
    const query = `SELECT id AS message_id, author AS author_name, datum as message_date, text as message_text
    FROM web4.message AS m`;

    try {
        const [row] = await connectionPool.execute(query, [messageId]);
        onResult(null, mapToMessage(<RowDataPacket[]>row)[0]);
    } catch (error) {
        onResult(error, null);
    }
};
const publishMessage = async (
    username: string,
    message: string,
    onResult: (error: Error) => void
) => {
    const query = `insert into web4.message values (id, ?, CURDATE(), ?)`;
    try {
        await connectionPool.execute(query, [username, message])
        onResult(null);
    } catch (error) {
        onResult(error);
    }
};
const getMessagesOfFriends = async (
    name: string, 
    onResult: (error: Error, messages: Message[]) => void) => {
        const query =  `select   m.author as message_author, m.id as message_id, m.text as message_text, m.datum as message_date
        from web4.friends as f inner join web4.student as s1 on f.friend1  = s1.id
        inner join web4.student as s2 on f.friend2=s2.id inner join web4.message as m on s2.name= m.author
        where f.friend1 = (select id from web4.student where name = ?)
        order by message_date desc
        limit 5`
        console.log(name)
        
        try{
            const [rows] = await connectionPool.query(query, [name]);
            console.log(rows)
            onResult(null, mapToMessage(<RowDataPacket[]>rows));
        }catch(error){
            onResult(error, null)
        }
    };


export { getMessages, getMessage, publishMessage, getMessagesOfFriends };
