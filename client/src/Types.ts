
export interface NoteType {
    author: string
    title: string
    content: string

    createdAt: Date
    updatedAt?: Date
    _id: string
}

export interface CreateNoteType {
    author: string
    title: string
    content: string
}