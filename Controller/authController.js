import UserModel from "../Models/UserModel.js"


 export const registerController =  async (req,res,next)=>{
    
        const {name,email,password } = req.body
        // if (!name){
        //     return res.status(400).send({success:false,message:"please provide name"})
        // }
        // if (!email){
        //     return res.status(400).send({success:false,message:"please provide email"})
        // }
        // if (!password){
        //     return res.status(400).send({success:false,message:"please provide password"})
        // }
        // check is user is already register with this email 
        // const exisitingUser = await UserModel.findOne({email})
        // if (exisitingUser){
        //     return res.status(200).send({
        //         success:false,
        //         message:"email already registered"
        //     })
        // }
        // we comment out this line because we have made a error middle ware in middleware folder which detect user is unique or not , if not then it send a message email should be unique.
        const user = await UserModel.create({name,email,password})

        // token
        const token = user.createJWT() 
        res.status(201).send({
            success:true,
            message:"User created successfully",
            user:{
                name:user.name,
            },
            token
        })

        
     
    
}

export const loginController = async (req,res,next)=>{
    const {email,password} = req.body
    //validation
    if (!email || !password){
        next('please Provide all Fields ')
    }

    const user = await UserModel.findOne({email})
    if(!user){
        next('Invalid Username or password')
    }
    // compare password
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        next('Invalid username or password')

    }
   
    const token = user.createJWT()
    res.status(200).json({
        success:true,
        message:"Login Successfully",
        user,
        token,
    });
}