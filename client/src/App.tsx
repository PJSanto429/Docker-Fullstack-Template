import { useCallback, useEffect, useState } from "react"
import { createNote, getAllNotes } from "./requests/notes"
import './app.css'
// import { toast } from "react-toastify"

export const App = () => {
    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)

    const [error, setError] = useState<any>()

    const [allNotes, setAllNotes] = useState<Types.NoteType[]>([])

    const [newNote, setNewNote] = useState<Types.CreateNoteType>({
        author: '',
        title: '',
        content: ''
    })

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                // toast("wpow so easy!")
                const data = await getAllNotes()
                setAllNotes(data)
            } catch (err) {
                setError(err)
                setFailed(true)
            }
            setLoading(false)
        }
        fetchNotes()
    }, [])

    const handleCreateNote = useCallback(async () => {
        try {
            const data = await createNote(newNote)
            setAllNotes([data, ...allNotes])
            setNewNote({
                author: '',
                title: '',
                content: ''
            })
        } catch (err) {
            setError(err)
            setFailed(true)
        }
    }, [newNote])

    return (
        <div className="container">
            <h2>Create a New Note</h2>
            <form className="note-form" onSubmit={(e) => {
                e.stopPropagation()
                e.preventDefault()
                handleCreateNote()
            }}>
                <div className="form-group">
                    <label htmlFor="author">Author</label>
                    <input
                        type="text"
                        id="author"
                        value={newNote.author}
                        onChange={(e) =>
                        setNewNote({ ...newNote, author: e.target.value })
                        }
                        placeholder="Enter author name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={newNote.title}
                        onChange={(e) =>
                        setNewNote({ ...newNote, title: e.target.value })
                        }
                        placeholder="Enter note title"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        value={newNote.content}
                        onChange={(e) =>
                        setNewNote({ ...newNote, content: e.target.value })
                        }
                        placeholder="Write your note..."
                    />
                </div>
                <div className='formButtons'>
                    <button type="reset">Reset</button>
                    <button type="submit">Create</button>
                </div>
            </form>

            <h2>All Notes</h2>
            <table className="notes-table">
                <thead>
                <tr>
                    <th>Author</th>
                    <th>Title</th>
                    <th>Content</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                </tr>
                </thead>
                <tbody>
                {allNotes.map((note) => (
                    <tr key={note._id}>
                        <td>{note.author}</td>
                        <td>{note.title}</td>
                        <td>{note.content}</td>
                        <td>{new Date(note.createdAt).toLocaleString()}</td>
                        <td>
                            {note.updatedAt ? new Date(note.updatedAt).toLocaleString() : "-"}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {!allNotes.length && (
                <>No Notes Yet</>
            )}
        </div>
    )
}
