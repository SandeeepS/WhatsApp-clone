import mongoose from "mongoose";

//showing data scehema
const whatsappschema = mongoose.Schema({
    message: String,
    name : String,
    timestamp:String,
    received: Boolean,

});

export default mongoose.model('messagecontents',whatsappschema)
 