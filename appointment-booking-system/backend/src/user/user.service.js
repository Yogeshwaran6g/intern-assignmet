const {Injectable} =require('@nestjs/common');
const User=require('./user.entity');
const dataSource=require('../database/config');
const bcrypt =require('bcrypt')
const jwt=require('jsonwebtoken')



@Injectable()
class UserService {
    constructor() {
        this.userRepository = dataSource.getRepository(User);
        this.id="1";
        }


    async getUser(){
        return await this.userRepository.findOne({where:{ id:this.id }});
    }

    async registerUser(userData) {
        const { username, usermail, password, role} = userData;

    

        const existingUser = await this.userRepository.findOne({where:{usermail}});
        console.log(existingUser)
        if (existingUser) {
          throw new Error('Email already in use');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = this.userRepository.create({username,usermail,password: hashedPassword,role});
    
        await this.userRepository.save(newUser);
        const {password:_, ...user } = newUser;
        return user;
      }
    





    async loginUser(userData) {
      const{usermail}=userData;
      const user = await this.userRepository.findOneBy({usermail
      
      });
      console.log(user)
      if (!user) {
        throw new Error('(1) invalid email or password ');
      }
      console.log("before compare",userData)
      const PasswordCheck = bcrypt.compare(userData.password,user.password);
      if (!PasswordCheck) {
        throw new Error('(2) invalid email or password ');
      }
  
      const token = jwt.sign(
        {id:user.id,role:user.role,usermail:user.usermail },process.env.JWT_SECRET,{expiresIn:'3h'});
  
      return { token,id:user.id };
    }

    
}

module.exports = UserService;


