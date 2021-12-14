import React,{ useState,useRef } from 'react'


function ShowModal(props) {
    const [desc, setdesc] = useState("")

    const handleChange = () => {
         setdesc(inputRef.current.value)
    }
    const inputRef = useRef(null);
    const handleSubmit = () => {
      console.log('chlaa')
      props.SetItems({
        id : Math.floor(Math.random()*10000),
        Items : desc,
        timeStamp : " ",
      });
      props.modal();
    }

    return (
    <div>
    <div class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div> 
    <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">
        Add Note 
      </label>
    <input ref = {inputRef} onChange={()=>handleChange()} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
    </div>
    <div className='flex flex-row items-center justify-center m-5'>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4 " onClick={()=>{console.log('hello'); return handleSubmit()}}>Submit</button>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4" onClick={props.modal}>Close</button>
    </div>
    </div>
      </div>
    </div>
  </div>
    )
}

export default ShowModal
