import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Slider } from 'antd';

import ServiceClient from "../service/ServiceClient";
import TimeUtil from "../util/TimeUtil";
import { activeSelectedSong, activePlayingList, activePlayer } from '../actions/SongAction';



class Player extends Component {

    constructor (props) {
        super(props);
        this.handlePlayerClick = this.handlePlayerClick.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleVolumeChange = this.handleVolumeChange.bind(this);
    }

    static defaultProps = {
        song: null,
        isPlaying: false
    }

    state = {
        min: 0,
        max: 100,
        curTime: 0,
        step: 1,
        vMin: 0,
        vMax: 1,
        vStep: 0.01,
        curVolume: 50,
        url: "",
    }

    componentDidMount()
    {
        this.player = this.refs["player"];
        this.audio = this.refs["audio"];
        this.curTime = this.refs["curTime"];
        this.audio.volume = (this.state.curVolume / 100);
        this.audio.onended = () => {
            this.props.dispatch(activePlayer(false));
            this.setState({
                curTime: 0
            });
        };
        this.audio.ontimeupdate = () => {
            const cur = Math.floor(this.audio.currentTime);
            if (cur != this.state.curTime)
            {
                this.setState({
                    curTime: cur
                })
            }
        };
    }

    async componentWillReceiveProps(nextProps)
    {
        if (nextProps.song && nextProps.isPlaying === true)
        {
            const res = await _formatSong(nextProps.song);
            this.setState({
                url: res.url,
                max: res.max
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState)
    {
        if (this.props.song && nextProps.song.id === this.props.song.id)
        {
            this.audio.play();
            return false;
        }
        return true;
    }

    handleVolumeChange(value)
    {
        const volume = Math.ceil(value * 100);
        this.audio.volume = value;
        this.setState({
            curVolume: volume
        });
    }

    handleTimeChange(value)
    {
        this.audio.currentTime = value;
        this.setState({
            curTime: value
        });
    }

    handlePlayerClick()
    {
        if (this.props.song)
        {
            this.toggleIsPlaying();
        }
    }

    toggleIsPlaying()
    {
        if (this.props.isPlaying === false)
        {
            this.audio.play();
            this.props.dispatch(activePlayer(true));
        }
        else
        {
            this.audio.pause();
            this.props.dispatch(activePlayer(false));
        }
    }


    handleSongSwitch(tag)
    {
        const { dispatch, playingList, song } = this.props;
        const list = playingList.map((item, i) => {
            return {
                index: i,
                id: item.id
            }
        });

        const item = list.find(s => s.id == song.id);
        if (tag === "prev")
        {
            if (item.index > 0) {
                dispatch(activeSelectedSong(playingList[item.index - 1]));
            }
        }
        else
        {
            if (item.index < playingList.length - 1) {
                dispatch(activeSelectedSong(playingList[item.index + 1]));
            }
        }
    }


    render()
    {
        let url = "";
        let duration = 0;
        if (this.props.song)
        {
            duration = TimeUtil.formatPlayTime(this.props.song.duration ? this.props.song.duration : this.props.song.dt);
        }
        const state = this.state;
        return (
            <div className="nmr-player">
                <div className="popup">popup</div>
                <div className="player-controls">
                    <span ref="previous" className="icon iconfont icon-previous" onClick={() => this.handleSongSwitch("prev")}></span>
                    <span ref="player" className={"icon iconfont " + (this.props.isPlaying === true ? "icon-pause" : "icon-play")} onClick={this.handlePlayerClick}></span>
                    <span ref="next" className="icon iconfont icon-next" onClick={() => this.handleSongSwitch("next")}></span>
                </div>
                <div className="time-bar">
                    <span ref="curTime" className="current-time">
                        {TimeUtil.formatAudioCurTime(state.curTime)}
                    </span>

                    <div className="play-time">
                        <Slider
                            defaultValue={0}
                            disabled={false}
                            tipFormatter={null}
                            min={state.min}
                            max={state.max}
                            step={state.step}
                            value={state.curTime}
                            onChange={this.handleTimeChange}
                        />
                    </div>
                    <span className="duration">{duration ? duration : "00:00"}</span>
                </div>
                <div className="volume-control">
                    <span className="icon iconfont icon-volume"></span>
                    <div className="volume-section">
                        <Slider
                            defaultValue={state.curVolume / 100}
                            disabled={false}
                            tipFormatter={null}
                            min={state.vMin}
                            max={state.vMax}
                            step={state.vStep}
                            value={state.curVolume / 100}
                            onChange={this.handleVolumeChange}
                        />
                    </div>
                    <span className="volume-value">{state.curVolume + "%"}</span>
                </div>
                <audio
                    ref="audio"
                    src={state.url}
                    autoPlay>
                </audio>
            </div>
        );
    }
}

async function _formatSong(song)
{
    if (song.mp3Url) {
        return {
            url: song.mp3Url,
            max: song.duration / 1000
        };
    } else {
        const detail = await ServiceClient.getInstance().getMusicUrl(song.id);
        return {
            url: detail.url,
            max: song.dt / 1000
        };
    }
}

function mapStateToProps(state) {
    return {
        playingList: state.playingList,
        song: state.selectedSong,
        isPlaying: state.isPlaying
    };
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(mapStateToProps)(Player);
