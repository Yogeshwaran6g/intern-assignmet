const {Module} = require('@nestjs/common');
const {TypeOrmModule} = require('@nestjs/typeorm');

const UserController = require('./user.controller');
const UserService = require('./user.service');
const User = require('./user.entity');

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
class UserModule {
  
}

module.exports = UserModule;
