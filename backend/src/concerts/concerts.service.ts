import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Concert } from './concerts.model';
import { Model } from 'mongoose';

@Injectable()
export class ConcertsService {
  constructor(
    @InjectModel('Concert') private readonly concertModel: Model<Concert>,
  ) { }

  async insertConcert(
    nameGroup: string,
    eventName: string,
    eventLoc: string,
    eventDate: string,
    type: string,
    price: number,
    imagepath: string,
    nbticket: number,
  ) {
    const newConcert = new this.concertModel({
      nameGroup,
      eventName,
      eventLoc,
      eventDate,
      type,
      price,
      imagepath,
      nbticket,
    });
    const res = await newConcert.save();
    return res.id as string;
  }

  async getAllConcerts() {
    const concerts = await this.concertModel.find().exec();
    return concerts.map((conc) => ({
      id: conc.id,
      nameGroup: conc.nameGroup,
      eventName: conc.eventName,
      eventLoc: conc.eventLoc,
      eventDate: conc.eventDate,
      type: conc.type,
      price: conc.price,
      imagepath: conc.imagepath,
      nbticket: conc.nbticket,
    }));
  }
  async getConcert(concertId: string) {
    const concert = await this.findConcert(concertId);
    return {
      id: concert.id,
      nameGroup: concert.nameGroup,
      eventName: concert.eventName,
      eventLoc: concert.eventLoc,
      eventDate: concert.eventDate,
      type: concert.type,
      price: concert.price,
      imagepath: concert.imagepath,
      nbticket: concert.nbticket,
    };
  }
  async updateConcert(
    concertId: string,
    nameGroup: string,
    eventName: string,
    eventLoc: string,
    eventDate: string,
    type: string,
    price: number,
    imagepath: string,
    nbticket: number,
  ) {
    const updatedConcert = await this.findConcert(concertId);

    if (nameGroup) {
      updatedConcert.nameGroup = nameGroup;
    }
    if (eventName) {
      updatedConcert.eventName = eventName;
    }
    if (eventLoc) {
      updatedConcert.eventLoc = eventLoc;
    }
    if (eventDate) {
      updatedConcert.eventDate = eventDate;
    }
    if (type) {
      updatedConcert.type = type;
    }
    if (price) {
      updatedConcert.price = price;
    }
    if (imagepath) {
      updatedConcert.imagepath = imagepath;
    }
    if (nbticket) {
      updatedConcert.nbticket = nbticket;
    }
    updatedConcert.save();
  }

  async deleteConcert(concertId: string) {
    const res = await this.concertModel.findByIdAndDelete(concertId).exec();
    // console.log(concertId);

    // if (res.deletedCount === 0) {
    //   throw new NotFoundException('Le concert a déjà été supprimé');
    // }
  }
  private async findConcert(id: string): Promise<Concert> {
    const concert = await this.concertModel.findById(id).exec();
    if (!concert) {
      throw new NotFoundException('Aucun résultat');
    }
    return concert;
  }

  // async bookTicket(concertId) {
  //   const concert = await this.concertModel.findById(concertId)
  //   console.log(concert);

  // }

  async searchConcerts(search) {
    const str = search.search

    const concerts = await this.concertModel.find({
      $or: [
        { nameGroup: { $regex: str, $options: 'i' } },
        { eventName: { $regex: str, $options: 'i' } },
        { eventLoc: { $regex: str, $options: 'i' } }

      ]
    })
    return concerts

  }
}
