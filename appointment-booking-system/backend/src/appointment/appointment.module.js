const {Module} = require('@nestjs/common');
const {TypeOrmModule} = require('@nestjs/typeorm');

const AppointmentController = require('./appointment.controller');
const AppointmentService = require('./appointment.service');
const Appointment = require('./appointment.entity');

@Module({
  imports: [TypeOrmModule.forFeature([Appointment])],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
class AppointmentModule {
  
}

module.exports = AppointmentModule;
