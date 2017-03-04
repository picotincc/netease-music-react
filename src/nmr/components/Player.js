import React, { Component } from 'react';
import { Slider } from 'antd';

import TimeUtil from "../util/TimeUtil";


export default class Player extends Component {

    constructor (props) {
        super(props);
        this._isPlaying = false;
        this.handlePlayerClick = this.handlePlayerClick.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleVolumeChange = this.handleVolumeChange.bind(this);
    }

    static defaultProps = {
        song: null
    }

    state = {
        min: 0,
        max: 100,
        curTime: 0,
        step: 1,
        vMin: 0,
        vMax: 1,
        vStep: 0.01,
        curVolume: 50
    }

    get isPlaying()
    {
        return this._isPlaying;
    }

    set isPlaying(value)
    {
        this._isPlaying = value;
    }

    render()
    {
        let url = "";
        let duration = 0;
        if (this.props.song)
        {
            url = this.props.song.mp3Url;
            duration = TimeUtil.formatPlayTime(this.props.song.duration);
        }
        const state = this.state;
        return (

            <div className="nmr-player">
                <div className="player-controls">
                    <span ref="previous" className="icon iconfont icon-previous"></span>
                    <span ref="player" className="icon iconfont icon-play" onClick={this.handlePlayerClick}></span>
                    <span ref="next" className="icon iconfont icon-next"></span>
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
                    src={url}
                    autoPlay>
                </audio>
            </div>
        );
    }

    componentDidMount()
    {
        this.player = this.refs["player"];
        this.audio = this.refs["audio"];
        this.curTime = this.refs["curTime"];
        this.audio.volume = (this.state.curVolume / 100);
        this.audio.onended = () => {
            this.player.classList.remove("icon-pause");
            this.player.classList.add("icon-play");
            this.isPlaying = false;
            this.setState({
                curTime: 0
            })
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
        if (this.isPlaying === false)
        {
            this.player.classList.remove("icon-play");
            this.player.classList.add("icon-pause");
            this.audio.play();
            this.isPlaying = true;
        }
        else
        {
            this.player.classList.remove("icon-pause");
            this.player.classList.add("icon-play");
            this.audio.pause();
            this.isPlaying = false;
        }
    }




    componentWillReceiveProps(nextProps)
    {
        if (nextProps.song)
        {
            if (nextProps.song.mp3Url)
            {
                this.player.classList.remove("icon-play");
                this.player.classList.add("icon-pause");
                this.isPlaying = true;
                this.setState({
                    max: nextProps.song.duration / 1000
                })
            }
        }
    }




}
