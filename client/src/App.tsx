import { useCallback, useEffect, useState } from "react"
import { exampleCreateItem, exampleGetRequest } from "./requests/example"

export const App = () => {

    const [text, setText] = useState('')

    const [name, setName] = useState('')
    const [age, setAge] = useState<number | undefined>(undefined)

    const testThing = useCallback(async () => {
        try {
            const data = await exampleGetRequest()
            setText(data.message)
        } catch (err) {
            console.error(err)
        }
    }, [text])

    useEffect(() => {
        testThing()
    }, [])

    const createThing = async (
        values: { name: string; age?: number }
    ) => {
        try {
            const data = await exampleCreateItem(values)
            setText(text + '\nCreated item with ID: ' + data._id)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div style={{
            backgroundColor: 'tan'
        }}>
            <>{text}</>
            <br />
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input
                type="number"
                placeholder="Age"
                value={age === undefined ? '' : age}
                onChange={(e) => {
                    const val = e.target.value
                    setAge(val === '' ? undefined : Number(val))
                }}
            />
            <button onClick={() => createThing({ name, age })}>
                Create Item
            </button>
        </div>
    )
}
