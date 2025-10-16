import { $axios } from '../services/axios'

export const getAllNotes = async (): Promise<Types.NoteType[]> => {
    return $axios.get('/')
        .then(d => d.data)
}

export const createNote = async (
    body: Types.CreateNoteType
): Promise<Types.NoteType> => {
    return $axios.post('/', body).then(d => d.data)
}