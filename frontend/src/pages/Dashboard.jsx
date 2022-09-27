import { useEffect } from "react"
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import GoalForm from "../components/GoalForm"
import GoalItem from "../components/GoalItem"
import Spinner from '../components/Spinner'
import { getGoals, reset } from "../features/goals/goalSlice"

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const {goals, isLoading, isError, message} = useSelector((state) => state.goals)

  useEffect(() => {
    if(isError) {
      console.log(message)
    }

    if(!user) {
      navigate('/login')
    }

    dispatch(getGoals())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if(isLoading) {
    return <Spinner/>
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mt-40">Welcome {user && user.name}</h1>
        <p className="text-2xl font-bold text-gray-600 mt-20">Goals Dashboard</p>
      </div>

      <GoalForm/>

      <div className="flex justify-center items-center">
        {goals.length > 0 ? (
          <div className="flex flex-col">
            {goals.map((goal, index) => (
              <GoalItem key={index} goal={goal} />
            ))}
          </div>
        ) : (<h3 className="mt-16 text-xl">You have no goals in life, add one now.</h3>) }
      </div>
    </>
  )
}

export default Dashboard