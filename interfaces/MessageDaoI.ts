import Message from "../models/messages/Message";
import User from "../models/users/User";

/**
 * @file Declares API for Messages related data access object methods
 */
export default interface MessageDaoI {
    userMessagesAnotherUser (message: String, from: String, to:String): Promise<Message>;
    findAllMessagesSentByUser (uid: String): Promise<Message[]>;
    findAllMessagesSentToUser (uid1: String, uid2: String, message: String): Promise<Message[]>;
    deleteMessage (uid1: String, uid2: String): Promise<any>;
}
