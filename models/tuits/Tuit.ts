/**
 * @file Tuit is an interface which contains information about the tuit. 
 */
import User from "../users/User";

/**  
 * @typedef Tuit represents tuit relationship between user and tuit
 * @property {String} tuit String which contains the tuit posted by the user.
 * @property {User} postedBy User who has posted the tuit
 * @property {Date }postedOn The date on which the tuit was posted
 */    
export default interface Tuit {
    tuit: string,
    postedBy: User,
    postedOn?: Date,
};