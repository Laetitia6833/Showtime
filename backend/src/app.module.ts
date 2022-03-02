import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConcertsController } from './concerts/concerts.controller';
// import { ConcertsController } from './concerts/concerts.controller';
import { ConcertsModule } from './concerts/concerts.module';
import { UserController } from './users/users.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost/showtime', {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   autoIndex: true, //make this also true
    // }),
    AuthModule,
    UsersModule,
    ConcertsModule,
    MongooseModule.forRoot(
      // 'mongodb+srv://show:showtime@cluster0.oc087.mongodb.net/showtime?retryWrites=true&w=majority',
      // 'mongodb://localhost/showtime',
      // 'mongodb+srv://show:showtime@cluster0.oc087.mongodb.net/showtime',
      'mongodb+srv://show:showtime@cluster0.oc087.mongodb.net/showtime?retryWrites=true&w=majority',
      // 'mongodb+srv://show:<password>@cluster0.oc087.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
      },
    ),
  ],
  controllers: [AppController, UserController, ConcertsController],
  providers: [AppService],
})
export class AppModule { }
