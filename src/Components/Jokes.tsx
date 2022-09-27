import React, {useState, useReducer} from 'react'
import axios from 'axios'

const initialState = {
  error: null,
  value: null,
}

function greetingReducer(state: any, action: { type: any; value?: any; error?: any }) {
  switch (action.type) {
    case 'SUCCESS': {
      return {
        error: null,
        value: action.value,
      }
    }
    case 'ERROR': {
      return {
        error: action.error,
        value: null,
      }
    }
    default: {
      return state
    }
  }
}

export default function Fetch({url}:{url:string}) {
  const [{error, value}, dispatch] = useReducer(
    greetingReducer,
    initialState,
  )
  const [buttonClicked, setButtonClicked] = useState(false)

  const fetchGreeting = async (url: string) =>
    axios
      .get(url)
      .then(response => {
        const {data} = response
        const {value} = data
        dispatch({type: 'SUCCESS', value})
        setButtonClicked(true)
      })
      .catch(error => {
        dispatch({type: 'ERROR', error})
      })

  const buttonText = buttonClicked ? 'Ok' : 'Load a Joke'

  return (
    <div>
      <button onClick={() => fetchGreeting(url)} disabled={buttonClicked}>
        {buttonText}
      </button>
      {value && <h1>{value}</h1>}
      {error && <p role="alert">Oops, failed to fetch!</p>}
    </div>
  )
}