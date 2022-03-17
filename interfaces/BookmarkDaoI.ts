import Bookmark from "../models/bookmarks/Bookmark";
import Tuit from "../models/tuits/Tuit";
/**
 * @file Declares API for Bookmarks related data access object methods
 */
export default interface BookmarkDaoI {
    userBookmarksTuit (tid: string, uid: string): Promise<Bookmark>;
    userUnbookmarksTuit (tid: string, uid: string): Promise<any>;
    findAllTuitsBookmarkedByUser (uid: string): Promise<Tuit[]>;
}
