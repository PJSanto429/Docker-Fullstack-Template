import { useCallback, useEffect, useState } from "react"
import { exampleGetRequest } from "./requests/example"

export const App = () => {

    const [text, setText] = useState('')

    const testThing = useCallback(async () => {
        try {
            const data = await exampleGetRequest()
            setText(text + data.message)
        } catch (err) {
            console.error(err)
        }
    }, [text])

    useEffect(() => {
        testThing()
    }, [])


    return (
        <div style={{
            backgroundColor: 'tan'
        }}>
            <>{text}</>
        </div>
    )
}
