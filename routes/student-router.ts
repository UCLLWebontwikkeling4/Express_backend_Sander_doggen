/**
 * @swagger
 *   components:
 *    schemas:
 *      student:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *            name:
 *              type: string
 *              description: student's name.
 *            status:
 *              type: String
 *              description: student's status.
 */
import express, { Request, Response, Handler } from 'express';
import * as studentModel from '../model/student';
import { Student } from '../types';

const studentRouter = express.Router();

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get a list of users and their status.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/student'
 */
studentRouter.get('/all', (req: Request, res: Response) => {
    studentModel.getStudents((err: Error, students: Student[]) => {
        if (err) {
            return res.status(500).json({ status: 'error', errorMessage: err.message });
        }

        res.status(200).json(students);
    });
});

/**
 * @swagger
 * /user/login:
 *   post:
 *      summary: login with a username
 *      responses:
 *         200:
 *           description: A student and their status
 *           content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/student'
 *      parameters:
 *        - name: username
 *          in: path
 *          description: username
 *          required: true
 *          schema:
 *            type: string
 */
studentRouter.post('/login', (req: Request, res: Response) => {
    const username = req.body.user;
    studentModel.getStudent(username, (error: Error, student: Student) => {
        if (error) {
            return res.status(403).json({ status: 'error', errorMessage: error.message });
        } else {
            res.status(200).json({status: 'success', student});
        }
    });
});
/**
 * @swagger
 * /user/friends:∑
 *   post:
 *      summary: add a friend
 *      responses:
 *         200:
 *           description: Student who you add their name and status
 *           content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/student'
 *      parameters:
 *        - name: username
 *          in: path
 *          description: username
 *          required: true
 *          schema:
 *            type: string
 *        - name: friendname
 *          in: path
 *          description: username
 *          required: true
 *          schema:
 *            type: string
 */
studentRouter.post('/friends', (req: Request, res: Response) => {
    const username = req.body.username
    const friendname = req.body.friendname;
    console.log(username)
    console.log(friendname)
    studentModel.addFriend(username,friendname, (error: Error, student: Student) => {
        if (error) {
            return res.status(404).json({ status: 'error', errorMessage: "User doesn’t exist" });
        } else {
            res.status(200).json({  status: student.status ,name: student.name });
        }
    });
});
/**
 * @swagger
 * /user/friends:
 *   get:
 *     summary: Get a list of friends of user.
 *     responses:
 *       200:
 *         description: A list of friends of user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/student'
 *     parameters:
 *       - name: username
 *         in: path
 *         description: username
 *         required: true
 *         schema:
 *           type: string
 */
studentRouter.get('/friends', (req: Request, res: Response) => {
    const name = req.query.user.toString();
    studentModel.getAllFriends(name, (error: Error, friends) => {
        if (error) {
            return res.status(500).json({ status: 'error', errorMessage: error.message });
        }
        res.status(200).json(friends);
        
    });
});

/**
 * @swagger
 * /user/status:
 *   put:
 *      summary: set a status for student
 *      responses:
 *         200:
 *           description: change a status of user
 *           content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/student'
 *      parameters:
 *        - name: username
 *          in: path
 *          description: username
 *          required: true
 *          schema:
 *            type: string
 *        - name: status
 *          in: path
 *          description: status
 *          required: true
 *          schema:
 *            type: string
 */

studentRouter.put('/status', (req: Request, res: Response) => {
    const username = req.body.user;
    const status = req.body.status;
    studentModel.changeStatus(username,status,  (error: Error) => {
        if(error){
            return res.status(404).json({ status: 'error', errorMessage: error.message });
        } else {
            res.status(200).json({status: status });
        }
    });
});


export { studentRouter };
