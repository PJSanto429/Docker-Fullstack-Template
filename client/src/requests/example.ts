import { $axios } from '../services/axios'

export const exampleGetRequest = async () => {
    const { data } = await $axios.get('/')
    return data
}

export const exampleCreateItem = async (item: {
    name: string
    age?: number
}) => {
    const { data } = await $axios.post('/', item)
    return data
}
