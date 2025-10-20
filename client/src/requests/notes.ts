import { $axios } from '../services/axios'
import { CreateNoteType, NoteType } from '../Types'

export const getAllNotes = async (): Promise<NoteType[]> => {
    return $axios.get('/')
        .then(d => d.data)
}

export const createNote = async (
    body: CreateNoteType
): Promise<NoteType> => {
    return $axios.post('/', body).then(d => d.data)
}