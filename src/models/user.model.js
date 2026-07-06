import mongoose, {schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userschema = new schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,

        },
        fullname: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,

        },
        avatar: {
            type: String, 
            required: true,
        },
        coverimage: {
            type: String,

        },
        watchhistory: [
        {
            type: schema.types.objected,
            ref: "video"
        }
        ],
        password: {
            type: String,
            required: [true,'password is required']
        },

        refreshtoken: {
            type: String

        }


},
{
    timestamps: true


}
    
)

userschema.pre("save",async function (next) {
    if(!this.ismodified("password"))return next();

    this.password = bcrypt.hash(this.password,10)
    next()
})

userschema.methods.ispasswordcorrect = async function (password) {
 return await bcrypt.compare(password, this.password)
}

userschema.methods.generateaccesstoken = function() {
    jwt.sign(
        { 
            _id:this._id,
            email: this.email,
            username: this.username,
            fukkname: this.fullname
                
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
userschema.methods.generaterefreshtoken = function() {
    jwt.sign(
        { 
            _id:this._id,
           
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)

}
    



export const user = mongoose.Model("user",userschema)