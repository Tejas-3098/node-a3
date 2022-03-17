/**
 * @file Implements DAO managing data storage of follows. Uses mongoose FollowModel
 * to integrate with MongoDB
 */
import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/follows/Follow";

/**
  * @class FollowDao Implements Data Access Object managing data storage
  * of Likes
  * @property {LikeDao} likeDao Private single instance of LikeDao
  */
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor() {}

    /**
      * Uses FollowModel to create follow relationship
      * @returns Promise To be notified when the follow relationship is created
      */
    userFollowsAnotherUser = async (uid1: string, uid2: string): Promise<Follow> => 
        FollowModel.create({userFollowed: uid2, followedBy:uid1});

    /**
      * Uses FollowModel to delete follow relationship
      * @returns Promise To be notified when the follow relationship is deleted
      */    
    userUnfollowsAnotherUser = async (uid1: string, uid2: string): Promise<any> =>
        FollowModel.deleteOne({userFollowed: uid2, followedBy:uid1})

    /**
      * Uses FollowModel to retreive all users followed by a user
      * @returns Promise To be notified when the users are retreived
      */     
    findAllUsersFollowedByUser = async (uid: string): Promise<Follow[]> =>
        FollowModel
        .find({followedBy:uid})
        .populate("userFollowed")
        .exec();

    /**
      * Uses FollowModel to retreive all users that follow a user
      * @returns Promise To be notified when the users are retreived
      */      
    findAllUsersThatFollowUser = async (uid: string): Promise<Follow[]> =>
        FollowModel.find({userFollowed: uid})
        .populate("followedBy")
        .exec();
        
}