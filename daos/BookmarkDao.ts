/**
 * @file Implements DAO managing data storage of follows. Uses mongoose FollowModel
 * to integrate with MongoDB
 */
import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";
import Bookmark from "../models/bookmarks/Bookmark";

/**
  * @class BookmarkDao Implements Data Access Object managing data storage
  * of Bookmarks
  * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
  */
export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao:BookmarkDao | null = null;
    public static getInstance = (): BookmarkDao => {
        if(BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }

    private constructor() {}

    /**
      * Uses BookmarkModel to create bookmark relationship
      * @returns Promise To be notified when the bookmark relationship is created
      */
    userBookmarksTuit = async (tid: string, uid: string): Promise<Bookmark> =>
        BookmarkModel.create({bookmarkedTuit: tid, bookmarkedBy: uid});
    /**
      * Uses BookmarkModel to delete bookmark relationship
      * @returns Promise To be notified when the bookmark relationship is deleted
      */    
    userUnbookmarksTuit = async (tid: string, uid: string): Promise<any> =>
        BookmarkModel.deleteOne({bookmarkedTuit: tid, bookmarkedBy: uid});
    
    /**
      * Uses BookmarkModel to retreive all bookmarks made by user
      * @returns Promise To be notified when the bookmarks are retreived
      */    
    findAllTuitsBookmarkedByUser = async (uid:string): Promise<any> => 
        BookmarkModel
        .find({bookmarkedBy: uid})
        .populate("bookmarkedTuit")
        .exec();
}