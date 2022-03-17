/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 * </ul>
 * 
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */
 import express, {Request, Response} from 'express';
 import UserController from "./controllers/UserController";
 import TuitController from "./controllers/TuitController";
 import LikeController from "./controllers/LikeController";
 import BookmarkController from './controllers/BookmarkController';
 import FollowController from './controllers/FollowController';
 import MessageController from './controllers/MessageController';
 import mongoose from "mongoose";
 

 
 // connect to the database
 //mongoose.connect('mongodb+srv://newuser:tuitera2@cluster1.uhdcr.mongodb.net/tuitera2?retryWrites=true&w=majority');
 mongoose.connect('mongodb+srv://tuiteruser:mongo1234@tuiter.uhdcr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
 const app = express();
 app.use(express.json());
 const cors = require('cors')
 app.use(cors())


 app.get('/', (req: Request, res: Response) =>
     res.send('Welcome!'));
 
 app.get('/add/:a/:b', (req: Request, res: Response) =>
     res.send(req.params.a + req.params.b));
 
 // create RESTful Web service API
 const userController = UserController.getInstance(app);
 const tuitController = TuitController.getInstance(app);
 const likesController = LikeController.getInstance(app);
 const followController = FollowController.getInstance(app);
 const bookmarkController = BookmarkController.getInstance(app);
 const messageController = MessageController.getInstance(app);
 /**
  * Start a server listening at port 4000 locally
  * but use environment variable PORT on Heroku if available.
  */
 const PORT = 4000;
 app.listen(process.env.PORT || PORT);