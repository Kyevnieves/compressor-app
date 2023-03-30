import { Schema, model, Document } from 'mongoose'
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 4,
        lowercase: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
}, { collection: 'users' });

export const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

export const validatePassword = async (password, passwordBD)=> {
    return await bcrypt.compare(password, passwordBD);
};


export default model('User', userSchema);