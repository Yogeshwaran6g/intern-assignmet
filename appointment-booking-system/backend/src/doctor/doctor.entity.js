const { Entity, PrimaryGeneratedColumn, Column, Unique } = require('typeorm');

@Entity('doctor')
@Unique(['name'])
class Doctor {
  @PrimaryGeneratedColumn()
  id;

  @Column({type:'text',nullable:false })
  name;


  @Column({type:'text',nullable:false })
  specialization;

  @Column({type:'timestamp with time zone',array:true,nullable:false })
  available_slots;



}

module.exports = Doctor;
