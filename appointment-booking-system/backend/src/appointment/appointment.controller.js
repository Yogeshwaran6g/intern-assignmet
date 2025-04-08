const {Controller,Get,Post,Body}=require('@nestjs/common');
const AppointmentService=require('./appointment.service');
const { parse } = require('@babel/core');

@Controller('appointment')
class AppointmentController{
    constructor(){
        this.appointmentService = new AppointmentService();
    }
  
    async bookAppointment(req,res) {
        try {
          console.log(req.body)
          const userId=parseInt(req.body.userId)
          const doctorId=parseInt(req.body.doctorId)
          const slot=req.body.slot;
          const appointment = await this.appointmentService.bookAppointment(userId, doctorId, slot);
          res.status(201).json({appointment });
        } 
        catch (error) {
          console.error(error);
          res.status(400).json({message: error.message ||"Booking appointment failed"});
        }
      }


    async cancelAppointment(req, res) {
      try {
        const {id}=req.params
        const appointment = await this.appointmentService.cancelAppointment(id);
        res.json(appointment);
      }catch (error) {
        res.status(400).json({ message: error.message });
      }
    }
  


    async getUserAppointments(req, res) {
      try {
        const { user_id } = req.user.id;
        const appointments = await this.appointmentService.getUserAppointments(user_id);
        res.json(appointments);
      }catch (error) {
        res.status(400).json({ message: error.message });
      }
    }
  
}

module.exports = AppointmentController;
