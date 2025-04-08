const {Controller,Get,Post,Body,Param,Res,Req}=require('@nestjs/common');
const userService=require('./user.service');
const jwt =require('jsonwebtoken')

@Controller('user')
class UserController {
    constructor() {
        this.userService = new userService();
    }

  
    
    async getUser(req,res) {    
        console.log(req?.body)
        
        const doc=await this.userService.getUser();
        return res.status(200).json(doc)
    }


    async register(req,res) {
        try {
            const userData=req.body.userData
            const newUser=await this.userService.registerUser(userData);
            return res.status(201).json({message:'user registered', user: newUser });
        }
        catch(error) {
            return res.status(400).json({ error: error.message });
        }
    }


    async login(req,res){
    try {
        const { usermail, password } = req.body.userData;
        const result = await this.userService.loginUser(req.body.userData);
        console.log(result)
        return res.status(200).json(result);

            
    }catch (error) {
        return res.status(400).json({f:"abcd",message: error.message });
    }
    }

    
    
}

module.exports = UserController;
