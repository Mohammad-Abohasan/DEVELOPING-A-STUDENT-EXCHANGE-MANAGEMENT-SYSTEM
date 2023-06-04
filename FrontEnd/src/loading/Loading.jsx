import { CircularProgress } from '@mui/material'
import './Loading.css'

const Loading = () => {
  return (
    <>
      <div className='spinner-container'>
        <CircularProgress color="secondary" />
      </div>
    </>
  )
}

export default Loading