import { OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import {mapToStudents, mapToStudentsList } from './student-mapper';
import { Student } from '../types';
import { connectionPool } from '../database';

const getStudents = async (onResult: (error: Error, Students: Student[]) => void) => {
    const query = `SELECT s.id,  s.name AS student_name,s.status as student_status, m.id AS message_id, m.author AS message_author, m.datum  AS message_date, m.text as message_text
    FROM web4.student AS s left outer join web4.message AS m on s.name=m.author`;

    try {
        const [rows] = await connectionPool.query(query);
        onResult(null, mapToStudents(<RowDataPacket[]>rows));
    } catch (error) {
        onResult(error, null);
    }
};
const getAllFriends = async (
    username : string,
    onResult: (error: Error, Students: Student[]) => void) => {
    const query = `select    s2.name as student_name, s2.status as student_status
    from web4.friends as f inner join web4.student as s1 on f.friend1  = s1.id
    inner join web4.student as s2 on f.friend2=s2.id
    where f.friend1 = (select id from web4.student where name = ?)`

    try {
        const [rows] = await connectionPool.query(query, [username]);
        console.log(rows)
        onResult(null, mapToStudentsList(<RowDataPacket[]>rows));
    } catch (error) {
        onResult(error, null);
    }
};




const getStudent = async (
    username: string,
    onResult: (error: Error, student: Student) => void
) => {
    const query = `SELECT s.id,  s.name AS student_name, s.status as student_status, m.id AS message_id, m.author AS message_author, m.datum  AS message_date, m.text as message_text
    FROM web4.student AS s left outer join web4.message AS m on s.name=m.author
    where s.name=?`;

    try {
        const [row] = await connectionPool.execute(query, [username]);
        console.log(row);
        console.log(row.toString().length)
        if(row.toString().length == 0){
            throw Error;
        }
        onResult(null, mapToStudents(<RowDataPacket[]>row)[0]);
    } catch (error) {
        onResult(error, null);
    }
};
const addFriend = async(
    username : string,
    friendsusername : string,
    onResult: (error: Error, student: Student) => void
) => {
    const query1 = `SELECT s.id as student_id,  s.name AS student_name, s.status as student_status, m.id AS message_id, m.author AS message_author, m.datum  AS message_date, m.text as message_text
    FROM web4.student AS s left outer join web4.message AS m on s.name=m.author
    where s.name=?`
    
    try{
        const[row] = await connectionPool.execute(query1, [friendsusername])
        if(row.toString().length == 0){
            throw Error;
        }
        const friend = mapToStudents(<RowDataPacket[]>row)[0];
        const friendid = friend.id;
        const querry2 = `SELECT s.id as student_id,  s.name AS student_name, s.status as student_status, m.id AS message_id, m.author AS message_author, m.datum  AS message_date, m.text as message_text
        FROM web4.student AS s left outer join web4.message AS m on s.name=m.author
        where s.name=?`
        const[row2] = await connectionPool.execute(querry2, [username])
        const self = mapToStudents(<RowDataPacket[]>row2)[0];
        const selfid = self.id
        try{
            const querry3 = `insert into web4.friends values (?,?)`
            await connectionPool.execute(querry3, [selfid, friendid])
        }catch(error){
            onResult(Error("Je hebt elkaar al als vriend"), null)
            return 
        }
        onResult(null, friend)
    }catch (error) {
        onResult(Error("User doesn’t exist"), null);
    }
};

const changeStatus = async (
    username: string,
    status: string,
    onResult: (error: Error) => void
) => {
    const query1 = `select * from web4.student where name=?`
    const query2 = `update web4.student set status=? where name= ?`;
    try {
        const[row1] = await connectionPool.execute(query1, [username])
        if(row1.toString().length == 0){
            throw Error;
        }
        const [row2] = await connectionPool.execute(query2, [status, username]);
        onResult(null);
        console.log(row1)
    } catch (error) {
        onResult(error);
    }
};



export { getStudents, getStudent, changeStatus, addFriend, getAllFriends };
