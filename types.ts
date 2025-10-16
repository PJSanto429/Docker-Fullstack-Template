
export {}

declare global {

    namespace Types {

        interface NoteType {
            author: string
            title: string
            content: string

            createdAt: Date
            updatedAt?: Date
            _id: string
        }

        interface CreateNoteType {
            author: string
            title: string
            content: string
        }

    }

}
