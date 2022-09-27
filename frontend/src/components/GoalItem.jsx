import { useDispatch } from 'react-redux'
import {deleteGoal} from '../features/goals/goalSlice'
import { Trash } from 'react-feather'

const GoalItem = ({goal}) => {
  const dispatch = useDispatch()

  return (
    <>
    <div className="flex justify-center">
      <div className=" relative justify-center mt-6">
        <div className="absolute flex top-0 right-0 p-3 space-x-1">
          <button onClick={() => dispatch(deleteGoal(goal._id))}><Trash className='text-red-800 hover:text-red-400'/></button>
        </div>
        <div className='bg-yellow-100 px-12 py-8 rounded-lg w-80'>
          <p className="mb-10 text-center text-xs font-bold ">{new Date(goal.createdAt).toLocaleString('en-US')}</p>
          <p className="text-lg text-center font-medium break-all">{goal.text}</p> 
        </div>   
      </div>
    </div>
    </>
  )
}

export default GoalItem