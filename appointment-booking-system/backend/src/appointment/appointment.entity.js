const { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } = require('typeorm');
const Doctor = require('../doctor/doctor.entity');
const User = require('../user/user.entity');

@Entity('appointment')
class Appointment {
  @PrimaryGeneratedColumn()
  id;

  @Column({type:'timestamp with time zone',nullable:false })
  appointment_time;

  @Column({type:'varchar',length:20,nullable:false })
  status;

  @ManyToOne(() => User,(user)=>user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name:'user_id' })
  user;
  

  @ManyToOne(() => Doctor,(doctor)=>doctor.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name:"doctor_id" })
  doctor;

  
  
  
}

module.exports = Appointment;
