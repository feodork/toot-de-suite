import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const CreateReview = () => {
    const [text, setText] = useState("")
    const { toot_id } = useParams()
    const handleChange = (e) => {setText(e.target.value)}
    const onSubmit = async (e) => {
        e.preventDefault()
        const res = await fetch("/reviews/new", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({text:text, toot_id:toot_id})
          })
          const data = await res.json()
        console.log(toot_id, text)
    }
    return(
        <>
        <h1>Review</h1>
        <form onSubmit={onSubmit}>
            <label htmlFor="text">Review</label>
            <input value={text} onChange={handleChange} type="text" id="text" name="text" required/>
            <button>Submit</button>
        </form>
        </>
    )

}

export default CreateReview