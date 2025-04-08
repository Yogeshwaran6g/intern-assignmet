const {Controller,Get,Post,Body,HttpStatus,HttpException,Param}=require('@nestjs/common');
const DoctorService=require('./doctor.service');

@Controller('doctor')
class DoctorController {
    constructor() {
        this.doctorService = new DoctorService();
    }
  
    async getDoctor(req,res) {
        
        try{

            const docid=(req.body.id)
            console.log(docid);
            const result=[]
             result[0]=await this.doctorService.getDoctor(docid);
            if(result.length>0){
                return res.status(200).json(result);
            }
            else{
                return res.status(200).json({message:'no doctors available'});
            }
        }
        catch(err){
           return res.status(500).json({message:err.message || "error"});
        }

    }

    async getAllDoctors(req,res){
        try{
            const result=await this.doctorService.getAllDoctors()
            console.log(result);
            if(result.length>0){
                return res.status(200).json(result);
            }
            else{
                return res.status(200).json({message:"no doctors found"});
            }

        }
        catch(err){
            return res.status(404).json({message:err.message});
        }
    }


}

module.exports = DoctorController;
