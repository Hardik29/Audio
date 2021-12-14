import React,{useState} from 'react'
import { withRouter } from "react-router-dom";
function Forms(props) {
    
    const [state, setstate] = useState(null)
    const fileHandle = (e) =>{
      setstate(e.target.files[0])
    }
    const onSubmit = (e) => {
        e.preventDefault();
        props.audioFile(state);
        props.history.push('/play-audio');
    }

    return (
        <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100'>
             <form onSubmit={onSubmit} className=' flex  bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md'>
             <input accept=".mp3, .wav, .aac, .wma, .m4a" type="file" onChange={fileHandle}/>
             <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"  type='submit' disabled={state === null ? true : false}>
            Upload
            </button>
             </form>
        </div>
    )
}

export default withRouter(Forms)
