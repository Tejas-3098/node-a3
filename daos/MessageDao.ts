/**
 * @file Implements DAO managing data storage of messages. Uses mongoose FollowModel
 * to integrate with MongoDB
 */
import MessageDaoI from "../interfaces/MessageDaoI";
import MessageModel from "../mongoose/messages/MessageModel";
import Message from "../models/messages/Message";
import User from "../models/users/User";

/**
  * @class MessageDao Implements Data Access Object managing data storage
  * of Messages
  * @property {MessageDao} messageDao Private single instance of MessageDao
  */
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if(MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }
    private constructor() {}

    /**
      * Uses MessageModel to create message relationship
      * @param {string} message message 
      * @param {string} uid1 Id of user 1
      * @param {string} uid1 Id of user 2
      * @returns Promise To be notified when the message relationship is created
      */
    userMessagesAnotherUser = async (message: String, uid1: String, uid2: String): Promise<Message> => 
        MessageModel.create({message: message, to: uid2, from: uid1});

    /**
      * Uses MessageModel to retreive all messages sent by user
      * @param {string} uid Id of user
      * @returns Promise To be notified when the messages are retreived
      */    
    findAllMessagesSentByUser = async (uid: String): Promise<Message[]> =>
        MessageModel.find({from:uid});

    /**
      * Uses MessageModel to retreive all messages sent to user
      * @param {string} uid1 Id of user 1
      * @param {string} uid2 Id of user 2
      * @returns Promise To be notified when the messages are retreived
      */    
    findAllMessagesSentToUser = async (uid1: String, uid2: String): Promise<Message[]> =>
        MessageModel.find({from:uid1, to:uid2});
    
    /**
      * Uses MessageModel to delete message relationship
      * @returns Promise To be notified when the message relationship is created
      */    
    deleteMessage = async (uid1: String, uid2: String): Promise<any> => 
        MessageModel.deleteMany({to: uid2, from:uid1});
}   