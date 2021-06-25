import React, { FormEvent, useState } from 'react'
import { useHistory } from 'react-router'

import './styles.css'

export const CreateAppointment = () => {
  const history = useHistory()
  const [body, setBody] = useState<string>('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <div className={"createAppointmentContainer"}>
      <button onClick={() => history.push('/')}>Back</button>
      <form onSubmit={(event) => handleSubmit(event)}>
        <label>Post Body</label>
        <input
          value={body}
          onChange={(change) => setBody(change.target.value)}
        ></input>
        <button type='submit'>Create Post</button>
      </form>
    </div>
  )
}
