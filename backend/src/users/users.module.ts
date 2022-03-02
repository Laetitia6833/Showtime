import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "src/auth/schemas/user.schema";
import { ConcertSchema } from "src/concerts/concerts.model";
import { ConcertsModule } from "src/concerts/concerts.module";
import { ConcertsService } from "src/concerts/concerts.service";
import { UsersService } from "./users.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        MongooseModule.forFeature([{ name: 'Concert', schema: ConcertSchema }]),
        ConcertsModule,
    ],
    providers: [UsersService, ConcertsModule],
    exports: [UsersService]
})

export class UsersModule { }
