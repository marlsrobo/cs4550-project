import mongoose from "mongoose";
const usersSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: String,
    lastName: String,
    userType: String,
    dob: Date,
    about: {type: String, default: "Welcome to my profile!"},
    profilePic: {type: String, default: "/images/blankProfile.png"}
}, {collection: "users"})
export default usersSchema;