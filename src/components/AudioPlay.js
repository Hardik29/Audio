import React, { useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { useEffect } from 'react';
import {withRouter} from 'react-router-dom';
import ShowModal from './ShowModal';

let wavesurfer = null;

function AudioPlay(props) {
    
    const [key, setkey] = useState("Loading..")
    const [Modal, setModal] = useState(false)
    const [Items, setItems] =  useState([])

    const handleModal = () => {
        if(key !== 'Loading..')
        setModal(true);
        if(key==="Play")
        setkey("Pause");
        else
        setkey("Play");
        wavesurfer.playPause();
    }
    const handleDelete = (id) => {
        const newItems = Items.filter(x => x.id!=id)
        setItems(newItems)
    } 

    const closeModal = () => {
        setModal(false);
        if(key==="Play")
        setkey("Pause");
        else
        setkey("Play");
        wavesurfer.playPause();
    }
    
    const SetItems = (Item) => {
        Item.timeStamp = wavesurfer.getCurrentTime().toFixed(3);
        const newItems  = [Item, ...Items]
        setItems(newItems);
    }

    const togglePausePlayback = () => {
        if(key==="Play")
        setkey("Pause");
        else
        setkey("Play");
        wavesurfer.playPause();
    }
      useEffect(() => {
         wavesurfer = WaveSurfer.create({
            container: '#waveform',
            waveColor: 'violet',
            progressColor: 'purple',
            scrollParent: true
        });  
        wavesurfer.loadBlob(props.audioFile);
        wavesurfer.on('loading', function () {
            wavesurfer.setProgressColor('#400');
        });
        wavesurfer.on('ready', function () {
            wavesurfer.play();
            setkey("Pause");
        });
        wavesurfer.on('error', () => {
            console.log('An error occurred!');
        });
        wavesurfer.on('finish', () => {
            console.log('Audio clip finished!');
        });
        return ()=>{
            wavesurfer.destroy();
        }
    }, [])

    return (
        <div>
            { Modal && <ShowModal modal={closeModal} SetItems={(Item)=>SetItems(Item)}/>}
            <div id='waveform' className='m-10'></div>
            <div className='m-10'>
           <div className='flex items-center justify-center space-x-2'>
            <button onClick={togglePausePlayback} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {
                  key
            }
            </button>
            <button onClick={()=>handleModal(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
           AddNotes
            </button>
            </div>
            <div className='mt-10'>{Items.map(x=><div key={x.id} className='mt-4  cursor-pointer relative flex items-center px-6 py-4 bg-blue-600 text-white rounded  flex-col md:flex-row space-y-4 md:space-y-0'>
                 <div className="flex-auto">
                 <h1 className="text-lg">{x.Items}</h1>@ {x.timeStamp} sec
                       </div>
                       <button onClick={()=>handleDelete(x.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Delete
            </button>
                    </div>)
                    }
                </div>
                
            </div>
        </div>
    )
}
export default withRouter(AudioPlay)

