import React, { PureComponent } from 'react'

import WaveSurfer from 'wavesurfer.js';


const getLocalItems = (key) => {
    const list = window.localStorage.getItem(key);

    if (list) { return JSON.parse(list) }

    return [];
};

export class AudioPlayc extends PureComponent {

    static waveSurfer = null;

    lsKey = 'notes';
    maxAudioSteps = 15;
    audioInterval = undefined;

    constructor(props) {
        super(props);

        this.state = {
            notes: getLocalItems(this.lsKey),
            audio: {
                volume: 4,
                isMute: false,
                duration: 0,
                isPlaying: false,
                currentTime: null
            },
            theme: 'light',
            remark: '',
            isNoteModalOpen: false,
            modalOpenTimestamp: 0
        };
    }


    addNote = () => {
        this.handleNoteModalClose();
         this.setState({
            notes: [
                ...this.state.notes,
                {
                    time: this.state.modalOpenTimestamp,
                    remark: this.state.remark,
                    audioName: this.props.audioFile?.name
                }
            ],
            remark: ''
        });
    }

    toggleAudioPlayback = () => {
        if (AudioPlayc.waveSurfer === null) { return }

        const refreshRate = 500;
        AudioPlayc.waveSurfer.playPause();

        if (AudioPlayc.waveSurfer.isPlaying()) {
            this.setState({
                audio: {
                    ...this.state.audio,
                    isPlaying: true
                }
            });

            this.audioInterval = setInterval(() => {
                this.setState({
                    audio: {
                        ...this.state.audio,
                        currentTime: AudioPlayc.waveSurfer.getCurrentTime()
                    }
                });
            }, refreshRate);

            return;
        }

        clearInterval(this.audioInterval);

        this.setState({
            audio: {
                ...this.state.audio,
                isPlaying: false
            }
        });
    };

    notesList = () => {
        if (this.state.notes.length !== 0) {
            const notesList = this.state.notes.filter((note) => note.audioName === this.props.audioFile?.name);

            if (notesList.length === 0) { return [] }

            return notesList;
        }

        return [];
    }

    removeNote = (noteData) => {
        const newNotes = this.state.notes.filter(note => {
            if (note.audioName === noteData.audioName && note.time === noteData.time) {
                return false;
            }
            return true;
        });

        this.setState({
            notes: newNotes
        });

        window.localStorage.setItem(this.lsKey, JSON.stringify(newNotes));
    }

    resumeFromTime = (note) => {
        console.log(note);
    }

    handleNoteModalClose = () => {

        this.setState({
            isNoteModalOpen: false
        });
    }

    handleNoteModalOpen = () => {
        console.log("chala");
        this.setState({
            isNoteModalOpen: true,
            modalOpenTimestamp: AudioPlayc.waveSurfer.getCurrentTime()
        });
    }

    updateRemark = (e) => {
        this.setState({
            remark: e.target.value
        });
    }

    componentDidMount() {
        AudioPlayc.waveSurfer = WaveSurfer.create({
            container: '#waveform',
            waveColor: 'violet',
            progressColor: 'purple'
        });

        if (typeof this.props.audioFile?.name !== 'string') { return }

        AudioPlayc.waveSurfer.loadBlob(this.props.audioFile);

        AudioPlayc.waveSurfer.on('ready', () => {
            this.handleVolumeChange(null, this.state.audio.volume);

            this.setState({
                audio: {
                    ...this.state.audio,
                    duration: AudioPlayc.waveSurfer.getDuration(),
                    currentTime: 0
                }
            });
        });

        AudioPlayc.waveSurfer.on('seek', () => {
            this.setState({
                audio: {
                    ...this.state.audio,
                    currentTime: AudioPlayc.waveSurfer.getCurrentTime()
                }
            });

            this.handleNoteModalOpen();
        });

        AudioPlayc.waveSurfer.on('error', () => {
            console.log('An error occurred!');
        });

        AudioPlayc.waveSurfer.on('finish', () => {
            console.log('Audio clip finished!');

            this.setState({
                audio: {
                    ...this.state.audio,
                    isPlaying: false,
                    currentTime: 0
                }
            });
        });
    }

    componentWillUnmount () {
        clearInterval(this.audioInterval);
        AudioPlayc.waveSurfer?.destroy();
    }

    componentDidUpdate (prevProps, prevState) {
        if (typeof this.state.notes?.length === 'undefined' ||
            typeof prevState.notes?.length === 'undefined') { return }

        if (this.state.notes.length > prevState.notes.length) {
            window.localStorage.setItem(this.lsKey, JSON.stringify(this.state.notes));
        }
    }

    render() {
        return (
                <div>
                    <div id='waveform' ></div>
                    <button onClick={this.toggleAudioPlayback}  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">             
                    PLAY
                    </button>
                    <button id="closeNoteModal" onClick={this.handleNoteModalClose} component="button">
                                Cancel
                    </button>
                    <button onClick={() => this.addNote()} className=" m-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Note</button>
                </div>
        );
    }
}

export default AudioPlayc
