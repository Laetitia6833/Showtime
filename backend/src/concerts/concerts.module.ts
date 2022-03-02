import { Module } from '@nestjs/common';
import { ConcertsController } from './concerts.controller';
import { ConcertsService } from './concerts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConcertSchema } from './concerts.model';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Concert', schema: ConcertSchema }]),
  ],
  controllers: [ConcertsController],
  providers: [ConcertsService],
  exports: [ConcertsModule, ConcertsService]
})
export class ConcertsModule { }
