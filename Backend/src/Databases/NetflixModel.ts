import mongoose from "mongoose";
const NetflixSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    title: {
        type:String,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    players: {
      type:[],
      required:true
    },
    type: {
        type: String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    video:{
        type:String,
        required:true
    },
    totalViews:{
        type:Number,
    }
})
const NetfixContent = mongoose.model("netflix" , NetflixSchema);
export default NetfixContent;