import mongoose from 'mongoose'

const challengeSchema = new mongoose.Schema({
    challengeName:{
        type : String,
        required:true,
    },
    point:{
        type : Number,
        required:true
    },
    startDate:{ 
        type:Date,
        default:Date.now(),
        
    },
    duration:{
        type:Number,
        required:true
    },
    endDate:{ 
        type:Date,
        default:Date.now(),
    },
    completed:{
        type:Boolean,
        default:false
    }
})

export default mongoose.model("challenge",challengeSchema)