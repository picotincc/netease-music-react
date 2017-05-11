import React, { Component } from 'react';
import { Slider } from 'antd';

import ServiceClient from "../service/ServiceClient";
import TimeUtil from "../util/TimeUtil";


export default class Player extends Component {

    constructor (props) {
        super(props);
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
        curVolume: 50,
        url: "",
        isPlaying: false
    }

    componentDidMount()
    {
        this.player = this.refs["player"];
        this.audio = this.refs["audio"];
        this.curTime = this.refs["curTime"];
        this.audio.volume = (this.state.curVolume / 100);
        this.audio.onended = () => {
            this.setState({
                curTime: 0,
                isPlaying: false
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

    async componentWillReceiveProps(nextProps)
    {

        if (nextProps.song)
        {
            if (this.props.song) {
                if (nextProps.song.id === this.props.song.id && this.state.isPlaying === true)
                {

                }
                else
                {
                    if (nextProps.song.mp3Url)
                    {
                        this.setState({
                            isPlaying: true,
                            url: nextProps.song.mp3Url,
                            max: nextProps.song.duration / 1000
                        });
                    }
                    else
                    {
                        const detail = await ServiceClient.getInstance().getMusicUrl(nextProps.song.id);
                        this.setState({
                            isPlaying: true,
                            url: detail.url,
                            max: nextProps.song.dt / 1000
                        });
                    }
                }
            }
            else
            {
                if (nextProps.song.mp3Url)
                {
                    this.setState({
                        isPlaying: true,
                        url: nextProps.song.mp3Url,
                        max: nextProps.song.duration / 1000
                    });
                }
                else
                {
                    const detail = await ServiceClient.getInstance().getMusicUrl(nextProps.song.id);
                    this.setState({
                        isPlaying: true,
                        url: detail.url,
                        max: nextProps.song.dt / 1000
                    });
                }
            }
        }
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
        if (this.state.isPlaying === false)
        {
            this.audio.play();
            this.setState({
                isPlaying: true
            });
        }
        else
        {
            this.audio.pause();
            this.setState({
                isPlaying: false
            });
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
                <div className="player-controls">
                    <span ref="previous" className="icon iconfont icon-previous" onClick={() => this.props.onSongSwitch("prev")}></span>
                    <span ref="player" className={"icon iconfont " + (state.isPlaying === true ? "icon-pause" : "icon-play")} onClick={this.handlePlayerClick}></span>
                    <span ref="next" className="icon iconfont icon-next" onClick={() => this.props.onSongSwitch("next")}></span>
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
