import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ConcertsService } from './concerts.service';

@Controller('concerts')
export class ConcertsController {
  constructor(private readonly concertsService: ConcertsService) { }
  @Post()
  async addConcert(
    @Body('nameGroup') concertNameGroup: string,
    @Body('eventName') concertEventName: string,
    @Body('eventLoc') concertEventLoc: string,
    @Body('eventDate') concertEventDate: string,
    @Body('type') concertType: string,
    @Body('price') concertPrice: number,
    @Body('imagepath') concertImagePath: string,
    @Body('nbticket') concertNbTicket: number,
  ) {
    const generatedId = await this.concertsService.insertConcert(
      concertNameGroup,
      concertEventName,
      concertEventLoc,
      concertEventDate,
      concertType,
      concertPrice,
      concertImagePath,
      concertNbTicket,
    );
    return { id: generatedId };
  }
  @Get()
  async getAllConcerts() {
    const concerts = await this.concertsService.getAllConcerts();
    return concerts;
  }
  @Get('concert/:id')
  getConcert(@Param('id') concertId: string) {
    return this.concertsService.getConcert(concertId);
  }
  @Patch(':id')
  async updateConcert(
    @Param('id') concertId: string,
    @Body('nameGroup') concertNameGroup: string,
    @Body('eventName') concertEventName: string,
    @Body('eventLoc') concertEventLoc: string,
    @Body('eventDate') concertEventDate: string,
    @Body('type') concertType: string,
    @Body('price') concertPrice: number,
    @Body('imagepath') concertImagePath: string,
    @Body('nbticket') concertNbTicket: number,
  ) {
    await this.concertsService.updateConcert(
      concertId,
      concertNameGroup,
      concertEventName,
      concertEventLoc,
      concertEventDate,
      concertType,
      concertPrice,
      concertImagePath,
      concertNbTicket,
    );
    return null;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeConcert(@Param('id') concertId: string) {
    await this.concertsService.deleteConcert(concertId);
    return null;
  }

  // @Post('bookTicket/:id')
  // async bookTicket(@Param('id') concertId) {
  //   console.log(concertId);
  //   return this.concertsService.bookTicket(concertId)

  // }

  @Post('search')
  async searchConcert(@Body() search) {
    return this.concertsService.searchConcerts(search)
  }


}
