const { Entity, PrimaryGeneratedColumn, Column, Unique, Check } = require('typeorm');


@Entity('users')
@Unique(['username', 'usermail'])
@Check('length(password) >= 8')
class User {

  @PrimaryGeneratedColumn()
  id;

    @Column({type:'varchar',length:100,nullable:false})
    username;

  @Column({type:'varchar',length:20,nullable:false})
  usermail;

  @Column({ type:'varchar',length:100,nullable:false })
  password;

  @Column({type:'varchar',default:'patient',})
  role;

}

module.exports = User;

