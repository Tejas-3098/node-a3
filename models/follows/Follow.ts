/**
 * @file Declares Follow data type representing relationship between
 * 2 users, as in a user follows another user
 */
 import User from "../users/User";

 /**
  * @typedef Follow Represents follows relationship between 2 users,
  * as in a user follows another user
  * @property {User} userFollowed the user who is being followed
  * @property {User} followedBy the user who is following the other user
  */
 export default interface Follow {
     userFollowed: User,
     followedBy: User
 };