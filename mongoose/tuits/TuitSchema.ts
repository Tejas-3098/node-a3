/**
 * @file Implements a mongoose schema which defines the shape of the object in tuits collection
 */
import mongoose, {Schema} from "mongoose";
import Tuit from "../../models/tuits/Tuit";
const TuitSchema = new mongoose.Schema<Tuit>({
    tuit: {type: String, required: true},
    postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    postedOn: {type: Date, default: Date.now}
}, {collection: "tuits"});
export default TuitSchema;