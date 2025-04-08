const { NestFactory } =require('@nestjs/core');
const { AppModule } =require('./app.module');
const express=require('express');
const UserController=require('./user/user.controller');
const DoctorController=require('./doctor/doctor.controller');
const AppointmentController=require('./appointment/appointment.controller');
const {authenticate} =require('../src/middlewares/auth.middleware');
const {initializeSocket} = require('./gateways/appointmentGateway');
const http=require('http');

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.use(express.json());
  app.use(express.urlencoded({extended:true}))
  app.enableCors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });


  const ucontroll = new UserController();
  const dcontroll = new DoctorController();
  const acontroll = new AppointmentController();

  const userRouter = express.Router();
  const doctorRouter = express.Router();
  const appointmentRouter = express.Router();

  // User routes
  userRouter.get('/', (req, res) => ucontroll.getUser(req, res));
  userRouter.post('/register', (req, res) => ucontroll.register(req, res));
  userRouter.post('/login', (req, res) => ucontroll.login(req, res));

  // Doctor routes
  doctorRouter.get('/', authenticate, (req, res) => dcontroll.getAllDoctors(req, res));
  doctorRouter.post('/', authenticate, (req, res) => dcontroll.getDoctor(req, res));

  // Appointment routes                                                         
  appointmentRouter.post('/newAppointment',authenticate,(req, res) => acontroll.bookAppointment(req,res));
  appointmentRouter.get('/getUserAppointments', authenticate, (req, res) => acontroll.getUserAppointments(req, res));
  appointmentRouter.patch('/:id/cancel', authenticate, (req, res) => acontroll.cancelAppointment(req, res));

  // Attach routers
  app.use('/user', userRouter);
  app.use('/doctor', doctorRouter);
  app.use('/appointment', appointmentRouter);


  const server=await app.listen(3000); 
  initializeSocket(server) 
  console.log("its running");
  


}
bootstrap();
