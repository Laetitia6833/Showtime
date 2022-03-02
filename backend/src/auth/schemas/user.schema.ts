import { isEmail } from 'class-validator'
import * as mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true,
        // index: true
    },
    password: String,
    admin: Boolean,
    favourites: Array,
})
