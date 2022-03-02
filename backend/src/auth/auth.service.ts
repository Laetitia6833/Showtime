import { ConflictException, Injectable, Post, Request } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./interface/user.interface";
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(@InjectModel('User') private userModel: Model<User>, private jwtService: JwtService) { }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const username = authCredentialsDto.username
        const email = authCredentialsDto.email
        const password = authCredentialsDto.password
        let admin = authCredentialsDto.admin

        if (!admin) {
            admin = false
        }

        const hashedPassword = await bcrypt.hash(password, 8)

        const user = new this.userModel({ username, email, password: hashedPassword, admin })

        try {
            await user.save()

        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('Email déjà utilisé')
            }
            console.log(error);

        }
    }

    async logout(user: User) {
        // localStorage.removeItem('user')
        // localStorage.removeItem('token')
    }

    async signIn(user: User) {
        const payload = { username: user.username, sub: user._id, admin: user.admin }

        return {
            accessToken: this.jwtService.sign(payload),
            user
        }
    }

    async validateUser(email: string, pass: string): Promise<User> {
        const user = await this.userModel.findOne({ email })

        if (!user) {
            return null
        }

        if (pass === user.password) {
            return user
        }

        const valid = await bcrypt.compare(pass, user.password)

        if (valid) {
            return user
        }
    }
}
