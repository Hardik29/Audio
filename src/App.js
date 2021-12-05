import './App.css';
import { useState,useRef} from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Forms from './components/Forms';
import AudioPlayc from './components/AudioPlayc';

function App() {
 const [audio, setaudio] = useState(null);
  const audioFile = (audio) => {
     setaudio(audio);
  }


return (
<div>
<Router>
      <Switch>
            <Route exact path='/'>
              <Forms audioFile={audioFile}/>
            </Route>
            <Route path='/play-audio'>
                    <AudioPlayc audioFile={audio} />
            </Route>
      </Switch>
</Router>
</div>
  );
}

export default App;
