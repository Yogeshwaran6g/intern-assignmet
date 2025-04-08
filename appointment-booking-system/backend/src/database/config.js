require('dotenv').config();
const {DataSource} = require('typeorm');
const Doctor=require('../doctor/doctor.entity');
const Appointment=require('../appointment/appointment.entity');
const User=require('../user/user.entity');

const dataSource =new DataSource (





    {
        type:'postgres',
        host:process.env.DB_HOST,
        port:process.env.DB_PORT,
        username:process.env.DB_USERNAME ,
        password:process.env.DB_PASSWORD,
        database:process.env.DB_NAME,
        entities:[Doctor,Appointment,User],
        synchronize:true,
    }



)
dataSource.initialize()
.then(()=>console.log("db conected bro"))
.catch((err)=>console.log(err))
module.exports=dataSource;