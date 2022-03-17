/**
 * @file Controller RESTful Web service API for Bookmarks resource
 */
import {Express, Request, Response} from "express";
import BookmarkDao from "../daos/BookmarkDao";
import BookmarkControllerI from "../interfaces/BookmarkControllerI";

/**
  * @class BookmarkController Implements RESTful Web service API for bookmarks resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>POST /api/users/:uid/tuits/:tid/bookmark to record that a user bookmarks a tuit
  *     </li>
  *     <li>DELETE /api/users/:uid/tuits/:tid to record that a user no longer bookmarks a tuit
  *     </li>
  *     <li>GET /api/users/:uid/bookmarks to retrieve all the tuits bookmarked by a user
  *     </li>
  * </ul>
  * @property {BookmarkDao} bookmarkDao Singleton DAO implementing bookmarks CRUD operations
  * @property {BookmarkController} BookmarkController Singleton controller implementing
  * RESTful Web service API
  */
export default class BookmarkController implements BookmarkControllerI {
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookmarkController | null = null;

    public static getInstance = (app: Express): BookmarkController => {
        if(BookmarkController.bookmarkController === null) {
            BookmarkController.bookmarkController = new BookmarkController();
            app.post("/api/users/:uid/tuits/:tid/bookmark", BookmarkController.bookmarkController.userBookmarksTuit);
            app.delete("/api/users/:uid/tuits/:tid", BookmarkController.bookmarkController.userUnbookmarksTuit);
            app.get("/api/users/:uid/bookmarks", BookmarkController.bookmarkController.findAllTuitsBookmarkedByUser);
        }
        return BookmarkController.bookmarkController;
    }

    private constructor() {}

    /**
      * To record that a user bookmarks a tuit
      * @param {Request} req Represents request from client, including the
      * path parameters uid and tid representing the user that is bookmarking the tuit
      * and the tuit being bookmarked
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the new bookmarks that were inserted in the
      * database
      */
    userBookmarksTuit = (req: Request, res:Response) =>
        BookmarkController.bookmarkDao.userBookmarksTuit(req.params.tid, req.params.uid)
        .then(bookmarks => res.json(bookmarks));

    /**
      * To record that a user unbookmarks a tuit
      * @param {Request} req Represents request from client, including the
      * path parameters uid and tid representing the user that is bookmarking the tuit
      * and the tuit being bookmarked
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the new bookmarks that were inserted in the
      * database
      */    
    userUnbookmarksTuit = (req: Request, res:Response) =>
        BookmarkController.bookmarkDao.userUnbookmarksTuit(req.params.tid, req.params.uid)
        .then(status => res.send(status));

    /**
      * Retrieves all tuits bookmarked by a user from the database
      * @param {Request} req Represents request from client, including the path
      * parameter uid representing the user bookmarked the tuits
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the tuit objects that were bookmarked
      */    
    findAllTuitsBookmarkedByUser = (req: Request, res:Response) =>
        BookmarkController.bookmarkDao.findAllTuitsBookmarkedByUser(req.params.uid)
        .then(bookmarks => res.json(bookmarks));
};