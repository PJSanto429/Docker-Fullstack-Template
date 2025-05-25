import { $axios } from '../services/axios'

export const exampleGetRequest = async () => {
    const { data } = await $axios.get('/')
    return data
}
