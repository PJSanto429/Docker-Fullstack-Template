import mongoose from 'mongoose'
const { Schema, model } = mongoose

export const Thing = model(
    'Thing',
    new Schema({
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true,
            default: 50
        }
    }, {
        versionKey: false,
        timestamps: true
    })
)