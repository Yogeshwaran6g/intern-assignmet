const {Injectable,Inject} =require('@nestjs/common');
const Appointment=require('./appointment.entity');
const dataSource=require('../database/config');
const {emitSlotBooked}=require('../gateways/appointmentGateway')


@Injectable()
class AppointmentService {
    
    constructor(  ){
        this.appointmentRepository = dataSource.getRepository(Appointment);
        // this.dataSource=dataSource;
    }      



    

    async getUserAppointments(user_id) {
      return await this.appointmentRepository.find({
        where: { user: { id: user_id } },
        relations: ["doctor","user"],
      });
    }
  

    async bookAppointment(userId, doctorId, selectedSlot) {
        console.log("from service",doctorId, userId, selectedSlot)
      const queryRunner =dataSource.createQueryRunner();
      
      try {
        await queryRunner.connect();
        await queryRunner.startTransaction();
        //1.
        await queryRunner.query( `insert into appointment (user_id, doctor_id,appointment_time,status)VALUES($1,$2,$3,$4)`,[userId, doctorId,selectedSlot,'confirmed']);
        //2.
        const doctor = await queryRunner.query(`SELECT available_slots FROM doctor WHERE id = $1`,[doctorId] );
        const slots = doctor[0].available_slots;
        const updatedSlots = slots.filter(slot => slot !== selectedSlot);
        // 3.
        await queryRunner.query(`update doctor set available_slots = $1 WHERE id = $2`, [updatedSlots, doctorId]);
        // 4.

        // console.log("debug no error1")
        emitSlotBooked( {
          doctorId,
          available_slots: updatedSlots,
        });
        // console.log("debug no error2")
        await queryRunner.commitTransaction();
            console.log("no error2")
        return { message: 'Appointment booked successfully' };
      
      }catch(error) {

          
          await queryRunner.rollbackTransaction();
          throw new Error('Booking failed: ' + error.message);

      }finally {
          await queryRunner.release();
      }}


    async cancelAppointment(appointment_id) {
      const appointment = await this.appointmentRepository.findOne({ where: { id: appointment_id},relations:["user"]});
      if (!appointment) throw new Error("Appointment not found.");
      
      appointment.status = "canceled";
      await this.appointmentRepository.save(appointment);
      return appointment;
    }

}

module.exports = AppointmentService;