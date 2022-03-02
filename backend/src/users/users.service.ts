import { Injectable, UseGuards } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AuthCredentialsDto, UpdateUserDto } from "src/auth/dto/auth-credentials.dto";
import { User } from "src/auth/interface/user.interface";
import { Concert } from "src/concerts/concerts.model";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private userModel: Model<User>,
        @InjectModel('Concert') private concertModel: Model<Concert>) { }

    async getAll() {
        return this.userModel.find()
    }

    async getAllAdmins() {
        return this.userModel.find({ admin: true })
    }

    async getAllUsers() {
        return this.userModel.find({ admin: false })
    }

    async getUserById(userId) {
        return this.userModel.findById(userId)
    }

    async updateUser(userId, updateUserDto: UpdateUserDto): Promise<void> {
        const newUser = await this.userModel.findByIdAndUpdate({ _id: userId }, updateUserDto)
            .populate('username')
            .populate('email')

        // return newUser
    }

    async deleteUser(userId) {
        return this.userModel.findByIdAndDelete(userId)
    }

    async addToFavourite(userId, concertId) {
        const user = await this.userModel.findById(userId)

        // const fav = user.favourites
        if (!user.favourites.includes(concertId.id)) {
            user.favourites.push(concertId.id)
            user.save()
        }
    }

    async getfavouriteconcerts(userId) {
        const user = await this.userModel.findById(userId)
        const favourites = user.favourites
        const concerts = await this.concertModel.find({ '_id': favourites })

        return concerts
    }

    async deleteFromFavourite(userId, concertId) {
        const user = await this.userModel.findById(userId)


        if (user.favourites.includes(concertId.id)) {
            let index = user.favourites.indexOf(concertId.id)
            if (index > -1) {
                user.favourites.splice(index, 1)
            }
            user.save()
            return "Concert retiré des favoris"
        }



    }
}
