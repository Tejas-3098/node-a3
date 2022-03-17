/**
 * @file Controller RESTful Web service API for messages resource
 */
import MessageDao from "../daos/MessageDao";
import Message from "../models/messages/Message";
import {Express, Request, Response} from "express";
import MessageControllerI from "../interfaces/MessageControllerI";

/**
  * @class MessageController Implements RESTful Web service API for follows resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>POST /api/users/:uid1/messages/:uid2 to record that a user messages another user
  *     </li>
  *     <li>GET /api/users/:uid/messages/sent to retreive all messages sent by user
  *     </li>
  *     <li>GET /api/users/:uid1/messages/received/:uid2 to retrieve all messages sent to user
  *     </li>
  *     <li>GET /api/users/:uid1/messages/:uid2 to delete a message
  *     </li>
  * </ul>
  * @property {MessageDao} messagesDao Singleton DAO implementing messages CRUD operations
  * @property {MessageController} MessageController Singleton controller implementing
  * RESTful Web service API
  */
export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null=null;

    /**
      * Creates singleton controller instance
      * @param {Express} app Express instance to declare the RESTful Web service
      * API
      * @return MessageController
      */
    public static getInstance = (app: Express): MessageController => {
        if(MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.post("/api/users/:uid1/messages/:uid2", MessageController.messageController.userMessagesAnotherUser);
            app.get("/api/users/:uid/messages/sent", MessageController.messageController.findAllMessagesSentByUser);
            app.get("/api/users/:uid1/messages/received/:uid2", MessageController.messageController.findAllMessagesSentToUser);
            app.delete("/api/users/:uid1/messages/:uid2", MessageController.messageController.deleteMessage);
        }
        return MessageController.messageController;
    }

    private constructor() {}

    /**
      * @param {Request} req Represents request from client, including the
      * path parameters uid1 and uid2 representing the user that is messaging the other
      * and the user being followed
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the new messages that were inserted in the
      * database
      */
    userMessagesAnotherUser = (req: Request, res: Response) =>
        MessageController.messageDao.userMessagesAnotherUser(req.body.message, req.params.uid1, req.params.uid2)
        .then(Message => res.json(Message));
    
    /**
      * Retrieves all messages sent by user from the database
      * @param {Request} req Represents request from client, including the path
      * parameter uid representing the user that messaged the users
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the user objects that were messaged
      */
    findAllMessagesSentByUser = (req: Request, res: Response) => 
        MessageController.messageDao.findAllMessagesSentByUser(req.params.uid) 
        .then((messages: Message[]) => res.json(messages));
    
    /**
      * Retrieves all messages sent to user from the database
      * @param {Request} req Represents request from client, including the path
      * parameter uid representing the user that messaged the users
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the user objects that were messaged
      */    
    findAllMessagesSentToUser = (req: Request, res: Response) => 
        MessageController.messageDao.findAllMessagesSentToUser(req.params.uid2, req.params.uid1)
        .then((messages: Message[]) => res.json(messages));

    /**
      * @param {Request} req Represents request from client, including the
      * path parameters uid1 and uid2 representing the user that is deleted a message sent to another user
      * @param {Response} res Represents response to client, including status
      * on whether deleting the message was successful or not
      */    
    deleteMessage = (req: Request, res: Response) => 
        MessageController.messageDao.deleteMessage(req.params.uid1, req.params.uid2)
        .then(Message => res.json(Message));
       
};