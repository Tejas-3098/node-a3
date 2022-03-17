/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
 import TuitModel from "../mongoose/tuits/TuitModel";
 import Tuit from "../models/tuits/Tuit";
 import TuitDaoI from "../interfaces/TuitDaoI";
 
 /**
  * @class UserDao Implements Data Access Object managing data storage
  * of Users
  * @property {UserDao} userDao Private single instance of UserDao
  */
 export default class TuitDao implements TuitDaoI{
     private static tuitDao: TuitDao | null = null;
     public static getInstance = (): TuitDao => {
         if(TuitDao.tuitDao === null) {
             TuitDao.tuitDao = new TuitDao();
         }
         return TuitDao.tuitDao;
     }
     private constructor() {}
     /**
      * Uses TuitModel to retrieve all tuits documents from tuits collection
      * @returns Promise To be notified when the tuits are retrieved from
      * database
      */
     findAllTuits = async (): Promise<Tuit[]> =>
         TuitModel.find();

     /**
      * Uses TuitModel to retrieve all tuit documents from tuits collection
      * @param {string} uid User's primary key
      * @returns Promise To be notified when tuits are retrieved from the database
      */      
     findAllTuitsByUser = async (uid: string): Promise<Tuit[]> =>
         TuitModel.find({postedBy: uid});
     
     /**
      * Uses TuitModel to retrieve single tuit document from tuits collection
      * @param {string} uid User's primary key
      * @returns Promise To be notified when tuit is retrieved from the database
      */    
     findTuitById = async (uid: string): Promise<any> =>
         TuitModel.findById(uid)
             .populate("postedBy")
             .exec();

     /**
      * Uses TuitModel to create a user
      * @param {string} uid User's primary key
      * @param {Tuit} tuit Tuit 
      * @returns Promise To be notified when tuit is created
      */          
     createTuitByUser = async (uid: string, tuit: Tuit): Promise<Tuit> =>
         TuitModel.create({...tuit, postedBy: uid});

     /**
      * Uses TuitModel to update the tuit
      * @param {string} uid User's primary key
      * @param {Tuit} tuit Tuit 
      * @returns Promise To be notified when tuit is updated
      */        
     updateTuit = async (uid: string, tuit: Tuit): Promise<any> =>
         TuitModel.updateOne(
             {_id: uid},
             {$set: tuit});
      
     /**
      * Uses TuitModel to delete a tuit document from tuits collection
      * @param {string} uid User's primary key
      * @returns Promise To be notified when tuit is deleted from the database
      */         
     deleteTuit = async (uid: string): Promise<any> =>
         TuitModel.deleteOne({_id: uid});
 }