import React, { Component } from 'react';

import ServiceClient from "../service/ServiceClient";
import TimeUtil from "../util/TimeUtil";

export default class TrackTable extends Component {

    constructor (props) {
        super(props);
        this._selectedId = "";
        this.onSelectionChange = this.onSelectionChange.bind(this);
    }

    static defaultProps = {
        playlistId: ""
    }

    state = {
        playlist: []
    }

    get selectedId()
    {
        return this._selectedId;
    }

    set selectedId(value)
    {
        if (value !== this._selectedId)
        {
            if (this._selectedId && this.refs[this._selectedId])
            {
                this.refs[this._selectedId].classList.remove("selected");
            }
            this._selectedId = value;
            this.refs[this._selectedId].classList.add("selected");
        }
    }

    render()
    {
        const playlist = this.props.playlist;
        const self = this;
        return (
            <table className="nmr-track-table-view">
                <thead>
                    <tr>
                        <td className="name">音乐标题</td>
                        <td className="artists">歌手</td>
                        <td className="album">专辑</td>
                        <td className="time">时长</td>
                    </tr>
                </thead>
                <tbody>
                    {playlist.map((item, i) => {
                        let id = item.id;
                        let duration = 0;
                        if (item.lMusic)
                        {
                            duration = item.lMusic.playTime;
                        }
                        else
                        {
                            duration = item.duration;
                        }
                        let time = TimeUtil.formatPlayTime(duration);
                        return (
                            <tr key={item.id} ref={item.id} onDoubleClick={() => this.onSelectionChange(item.id)}>
                                <td>{item.name}</td>
                                <td>{item.artists.map(artist => artist.name).join(",")}</td>
                                <td>{item.album.name}</td>
                                <td>{time}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }

    onSelectionChange(id)
    {
        this.selectedId = id;
        const selectedSong = this.props.playlist.find((item) => {
            return item.id === id ? true : false;
        });
        this.props.handleClick(selectedSong);
    }

    componentDidMount()
    {
        // this._loaderPlayList(this.props.playlistId);
    }

    componentWillReceiveProps(nextProps)
    {
        // this.selectedId = null;
        // this._loaderPlayList(nextProps.playlistId);
    }


}
