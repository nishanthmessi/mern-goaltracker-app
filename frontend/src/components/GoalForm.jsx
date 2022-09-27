import {useState} from "react"
import {useDispatch} from "react-redux"
import {createGoal} from '../features/goals/goalSlice'

const GoalForm = () => {
  const [text, setText] = useState('')

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createGoal({ text }))
    setText('')
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <form onSubmit={onSubmit} className='flex flex-col justify-center items-center'>
          <label htmlFor="text" className="font-medium mt-8 mb-2">What's your goal today ?</label>
          <input className="border-2 border-gray-400 rounded-md w-80 p-2" type="text" name="text" id="text" value={text} onChange={(e) => setText(e.target.value)}/>
          <div>
            <button className="bg-black text-white px-4 py-2 rounded-md mt-6" type="submit">Add Goal</button>
          </div>
        </form>      
      </div>
    </>
  )
}

export default GoalForm