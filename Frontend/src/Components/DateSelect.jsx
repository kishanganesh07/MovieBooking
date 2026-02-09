import { useState } from 'react'
import {ChevronLeft, ChevronRight} from 'lucide-react'

import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
const DateSelect = ({dateTime,id}) => {
    const navigate=useNavigate()
      const [shows, setShows] = useState([]);
    const [selected,setSelected]=useState(null)

    const onBookHandler=()=>{
        if(!selected){
            return toast('Please Select a Date')
        }
        navigate(`/movies/${id}/${selected}`)
    }
  return (
    <div className='pt-30 ' id='dateSelect'>
      <div className='flex flex-col md:flex-row items-center justify-between gap-10 relative p-8 bg-red-900 border border-red-100/20 rounded-lg'>
        <div> 
            <p className='text-lg font-semibold '>Choose date</p>
            <div className="flex items-center gap-6 text-sm mt-5 ">
                <ChevronLeft width={28 }/>
                <span className='grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4 '>{dateTime && Object.keys(dateTime).map((date)=>(
                    <button key={date} onClick={()=>setSelected(date)} className={`flex flex-col items-center justify-center h-14 w-14 aspect-square rounded cursor-pointer ${selected===date ? "bg-red-600 text-white ":"border border-primary/70"}`}>
                        <span>{new Date(date).getDate()}</span>
                        <span>{new Date(date).toLocaleDateString("en-US",{month:"short"})}</span>
                    </button>
                ))}</span>
                <ChevronRight width={28}/>
            </div>
        </div>
        <button onClick={onBookHandler} className='bg-red-600 text-white px-8 py-2 mt-6 rounded hover:bg-primary/90 transition-all cursor-pointer'>Book Now</button>
      </div>
    </div>
  )
}

export default DateSelect
