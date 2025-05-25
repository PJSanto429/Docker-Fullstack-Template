import { exampleGetRequest } from "./requests/example"

export const App = () => {

    const testThing = async () => {
        try {
            const data = await exampleGetRequest()
            alert('Success: ' + data?.message)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <button onClick={testThing}>Press me</button>
        </>
    )
}
