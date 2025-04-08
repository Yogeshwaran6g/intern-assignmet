import { Module } from '@nestjs/common';
const {TypeOrmModule} =require('@nestjs/typeorm');
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThrottlerModule } from '../node_modules/@nestjs/throttler/dist/throttler.module';
const dataSource=require('./database/config');
// import DoctorModule from './doctor/doctor.module';
const DoctorModule =require('./doctor/doctor.module');
const AppointmentModule=require('./appointment/appointment.module')
const UserModule=require('./user/user.module')
const appointmentModule=require('./gateways/appointmentGateway')
const appointmentsGateway =require('./gateways/appointmentGateway')



@Module({
  imports: [
    TypeOrmModule.forRoot(dataSource.options),
    ThrottlerModule.forRoot({
      ttl:60,limit:10,
    }),DoctorModule,AppointmentModule,UserModule,appointmentModule],
    controllers: [AppController],
    providers: [AppService,appointmentsGateway],
})


export class AppModule {}
