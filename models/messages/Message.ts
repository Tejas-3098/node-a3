/**
 * @file Declares Message data type representing relationship between
 * 2 users, as in one user messages another
 */
import User from "../users/User";
/**
  * @typedef Message Represents messages relationship between 2 users,
  * as in a user messages another user
  * @property {String} message The message that the user wants to send
  * @property {User} to The user receiving the message
  * @property {User} from The user sending the message
  * @property {Date} sentOn The timestamp of the message
  */
export default interface Message {
    message: String,
    to: User,
    from: User,
    sentOn: Date
};
