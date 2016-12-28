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
        if (this.state.selectedId === null && nextProps.playlist.length > 0)
        {
            nextProps.onSongClick(nextProps.playlist[0]);
            this.setState({
                selectedId: nextProps.playlist[0].id
            });
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
        const playlist = this.props.playlist ? this.props.playlist : [];
        const selectedId = this.state.selectedId;
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
                        let selectedClass = (item.id === selectedId) ? "selected" : "";
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
                            <tr key={item.id} className={selectedClass} onDoubleClick={() => this.handleClick(item.id)}>
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



}
