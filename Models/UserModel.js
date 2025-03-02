import mongoose  from "mongoose"; 
import validator from 'validator';
import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true , "Name is required"]
    },
    lastname:{
        type:String,
        
    },
    email:{
        type:String,
        required:[true, "Email is required"],
        unique:true,
        validate:validator.isEmail,
    },
    password:{
        type:String,
        required:[true,"Password is require"],
        minlength:[6,"Password length  should be greater than 6 character"],
        select:true,
    },
    location:{
        type:String,
        default:"India"
    }
},{timestamps:true}
);
// encrpt password before saving in data base schema 
userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password , salt);
})

//compare Password
userSchema.methods.comparePassword = async function (userPassword) {
    const isMatch = await bcrypt.compare(userPassword,this.password);
    return isMatch;
}


//JSON WEBTOKEN
userSchema.methods.createJWT = function(){
    return JWT.sign({userId:this._id},process.env.JWT_SECRET,{expiresIn:'1d'})
}
export default mongoose.model("User" , userSchema)
