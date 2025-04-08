const {Injectable} =require('@nestjs/common');
const Doctor=require('./doctor.entity');
const dataSource=require('../database/config');

@Injectable()
class DoctorService {
    constructor() {
        this.doctorRepository = dataSource.getRepository(Doctor);
        }

    async getDoctor(id){
        this.id=id
        return await this.doctorRepository.findOne({where:{ id:this.id }})
        }
    async getAllDoctors(){
        return await this.doctorRepository.find();
    }

}

module.exports = DoctorService;
