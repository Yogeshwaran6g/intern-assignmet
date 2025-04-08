const {Module} = require('@nestjs/common');
const {TypeOrmModule} = require('@nestjs/typeorm');

const DoctorController = require('./doctor.controller');
const DoctorService = require('./doctor.service');
const Doctor = require('./doctor.entity');

@Module({
  imports: [TypeOrmModule.forFeature([Doctor])],
  controllers: [DoctorController],
  providers: [DoctorService],
})
class DoctorModule {
  
}

module.exports = DoctorModule;
