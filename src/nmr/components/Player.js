import React, { Component } from 'react';

import ServiceClient from "../service/ServiceClient";
import TimeUtil from "../util/TimeUtil";


export default class Player extends Component {

    constructor (props) {
        super(props);
        this._isPlaying = false;
        this.handlePlayerClick = this.handlePlayerClick.bind(this);
    }

    static defaultProps = {
        song: null
    }

    state = {

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
        return (

            <div className="nmr-player">
                <div className="player-controls">
                    <span ref="previous" className="icon iconfont icon-previous"></span>
                    <span ref="player" className="icon iconfont icon-play" onClick={this.handlePlayerClick}></span>
                    <span ref="next" className="icon iconfont icon-next"></span>
                </div>
                <div className="time-bar">
                    <span ref="curTime" className="current-time">00:00</span>
                    <div className="play-time">
                        <div ref="playingBar" className="playing-bar"></div>
                        <div ref="playingIcon" draggable="true" className="playing-icon iconfont icon-circle1"></div>
                    </div>
                    <span className="duration">{duration ? duration : "00:00"}</span>
                </div>
                <audio
                    ref="audio"
                    src={url}
                    autoPlay
                    controls>
                </audio>
            </div>
        );
    }

    componentDidMount()
    {
        this.player = this.refs["player"];
        this.audio = this.refs["audio"];
        this.curTime = this.refs["curTime"];
        this.playingBar = this.refs["playingBar"];
        this.playingIcon = this.refs["playingIcon"];
        this.audio.onended = () => {
            this.player.classList.remove("icon-pause");
            this.player.classList.add("icon-play");
            this.isPlaying = false;
            this.playingBar.style.width = "0px";
            this.playingIcon.style.left = 320  + "px";
        };
        this.audio.ontimeupdate = () => {
            this.curTime.innerHTML = TimeUtil.formatAudioCurTime(this.audio.currentTime);
            let offset = Math.round(714 * Math.round(this.audio.currentTime)/Math.round(this.audio.duration));
            this.playingBar.style.width = offset + "px";
            this.playingIcon.style.left = (320 + offset) + "px";
        };
        this.playingIcon.ondragstart = (e) => {
            const x = e.clientX - this.playingIcon.offsetLeft;

            this.playingIcon.ondrag = (e1) => {
                let left = e1.clientX - x;
                let width = 0;
                if (left < 320)
                {
                    left = 320;
                }
                else if (left > 1034)
                {
                    left = 1034;
                    width = 714;
                }
                else
                {
                    width = left - 320;
                }
                this.playingIcon.style.left = left + "px";
                this.playingBar.style.width = width + "px";
            };

            this.playingIcon.ondragend = (e1) => {
                let left = e1.clientX - x;
                let width = 0;
                if (left < 320)
                {
                    left = 320;
                }
                else if (left > 1034)
                {
                    left = 1034;
                    width = 714;
                }
                else
                {
                    width = left - 320;
                }
                this.playingIcon.style.left = left + "px";
                this.playingBar.style.width = width + "px";

                const currentTime = (Math.round(this.audio.duration) * width) / 714;
                this.audio.currentTime = currentTime;
            };
        };
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
            }
        }
    }




}
