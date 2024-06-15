import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    firstname: { type: String, required: true},
    lastname: { type: String, required: true},
    middle_name: { type: String, required: true},
    passport_url: { type: String, required: true},
    cv_url: { type: String, required: true}
})

export const User = mongoose.model('User', userSchema)