import React, { Component } from 'react';

import TimeUtil from "../util/TimeUtil";

export default class TrackTable extends Component {

    constructor (props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    state = {
        selectedId: null
    }

    componentWillReceiveProps(nextProps)
    {
        if (this.state.selectedId === null && nextProps.playlist !== null && nextProps.playlist.length > 0)
        {
            this.setState({
                selectedId: nextProps.playlist[0].id
            });
            nextProps.onSongClick(nextProps.playlist[0]);
        }
    }

    handleClick(id)
    {
        const selectedId = this.state.selectedId;
        if (id !== selectedId)
        {
            this.setState({
                selectedId: id
            });
            const song = this.props.playlist.find(item => item.id === id);
            this.props.onSongClick(song);
        }
    }

    render()
    {
        const playlist = this.props.playlist;
        if (playlist === null || playlist.length === 0) {
            return (
                <div className="nmr-track-table-view"></div>
            );
        }
        const selectedId = this.state.selectedId;
        const self = this;

        return (
            <div className="nmr-track-table-view">
                <div className="table-tab">
                    <div className="tab-tracks">
                        歌曲列表
                    </div>
                </div>
                <table className="track-table">
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
                            let selectedClass = (item.id === selectedId) ? "selected" : "";
                            let time = TimeUtil.formatPlayTime(item.lMusic ? item.lMusic.playtime : item.dt);
                            let artists = item.ar || item.artists;
                            let album = item.al || item.album;
                            return (
                                <tr key={item.id} className={selectedClass} onDoubleClick={() => this.handleClick(item.id)}>
                                    <td>{item.name}</td>
                                    <td>{artists.map(artist => artist.name).join(",")}</td>
                                    <td>{album.name}</td>
                                    <td>{time}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

        );
    }



}
