import React, { Component } from 'react';

import ServiceClient from "../service/ServiceClient";

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
        var url = "";
        if (this.props.song)
        {
            url = this.props.song.mp3Url;
        }
        return (

            <div className="nmr-player">
                <div className="player-controls">
                    <span ref="previous" className="icon iconfont icon-previous"></span>
                    <span ref="player" className="icon iconfont icon-play1" onClick={this.handlePlayerClick}></span>
                    <span ref="next" className="icon iconfont icon-next"></span>
                </div>
                <div className="time-bar"></div>
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
    }

    handlePlayerClick()
    {
        this.toggleIsPlaying();
    }

    toggleIsPlaying()
    {
        if (this.isPlaying === false)
        {
            this.player.classList.remove("icon-play1");
            this.player.classList.add("icon-zanting2");
            this.audio.play();
            this.isPlaying = true;
        }
        else
        {
            this.player.classList.remove("icon-zanting2");
            this.player.classList.add("icon-play1");
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
                this.player.classList.remove("icon-play1");
                this.player.classList.add("icon-zanting2");
                this.isPlaying = true;
            }
        }
    }




}
