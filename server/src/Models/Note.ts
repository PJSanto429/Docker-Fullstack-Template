import mongoose from 'mongoose'
const { Schema, model } = mongoose

export const Note = model(
    'Note',
    new Schema({
        author: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    }, {
        versionKey: false,
        timestamps: true
    })
)