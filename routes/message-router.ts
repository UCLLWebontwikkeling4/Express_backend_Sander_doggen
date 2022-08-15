/**
 * @swagger
 *   components:
 *    schemas:
 *      message:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *            author:
 *              type: string
 *              description: Author of message.
 *            datum:
 *              type: Date
 *              description: Date of when de message is published.
 *            text:
 *              type: string 
 *              description: Text of the message.
 */
import express, { Request, Response, Handler } from 'express';
import { parse } from 'path';
import * as messageModel from '../model/message';
import { Message } from '../types';

const messageRouter = express.Router();

/**
 * @swaggerc
 * /messages:
 *   get:
 *     summary: Get a list of messages from our friends
 *     responses:
 *       200:
 *         description: A list of the last 5 messages.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/message'
 */

messageRouter.get('/', (req: Request, res: Response) => {
    const name = req.query.user.toString();
    messageModel.getMessagesOfFriends(name, (error: Error, messages: Message[]) => {
        if (error) {
            return res.status(500).json({ status: 'error', errorMessage: error.message });
        } else {
            res.status(200).json(messages);
        }
    });
});

/**
 * @swagger
 * /messages/get/{id}:
 *   get:
 *      summary: Get a message by ID
 *      responses:
 *         200:
 *           description: A message
 *           content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/message'
 *      parameters:
 *        - name: id
 *          in: path
 *          description: message ID
 *          required: true
 *          schema:
 *            type: integer
 *            format: int64
 */
messageRouter.get('/get/:id', (req: Request, res: Response) => {
    const messageId = parseInt(req.params.id);
    messageModel.getMessage(messageId, (error: Error, message: Message) => {
        if (error) {
            return res.status(500).json({ status: 'error', errorMessage: error.message });
        } else {
            res.status(200).json(message);
        }
    });
});
/**
 * @swagger
 * /messages:
 *   post:
 *      summary: Post a message.
 *      responses:
 *         200:
 *           description: A succes status.
 *           content:
 *              status
 */

messageRouter.post('/', (req: Request, res: Response) => {
    console.log('geraakt in de post methode')
    const username = req.body.user;
    const message = req.body.message;
    messageModel.publishMessage(username,message, (error: Error) => {
        if (error) {
            return res.status(500).json({ status: 'error', errorMessage: error.message });
        }
            res.status(200).json({status: 'succes'});
    });
});

export { messageRouter };
