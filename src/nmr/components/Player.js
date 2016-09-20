import React, { Component } from 'react';

import ServiceClient from "../service/ServiceClient";

export default class Player extends Component {

    constructor (props) {
        super(props);
    }

    static defaultProps = {
        song: null
    }

    state = {

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
                    <span>播放</span>
                </div>
                <div className="time-bar"></div>
                <audio
                    src={url}
                    autoPlay
                    controls>
                </audio>
            </div>
        );

    }



    componentDidMount()
    {
        // this._loaderPlayList(this.props.playlistId);
    }

    componentWillReceiveProps(nextProps)
    {
        // this._loaderPlayList(nextProps.playlistId);
    }




}
