import React, { Component } from 'react';

import ServiceClient from "../service/ServiceClient";

export default class TrackTable extends Component {

    constructor (props) {
        super(props);
    }

    static defaultProps = {
        playlistId: ""
    }

    state = {
        playlist: []
    }

    render()
    {
        const playlist = this.state.playlist;
        const self = this;
        console.log(playlist);
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
                        return (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.artists.map(artist => artist.name).join(",")}</td>
                                <td>{item.album.name}</td>
                                <td>time</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }

    componentDidMount()
    {
        this._loaderPlayList(this.props.playlistId);
    }

    componentWillReceiveProps(nextProps)
    {
        console.log(nextProps, "will receiveProps");
        this._loaderPlayList(nextProps.playlistId);
    }

    async _loaderPlayList(id)
    {
        if(id && id !== "")
        {
            const playlist = await ServiceClient.getInstance().getPlayListDetail(id);
            console.log(playlist);
            this.setState({ playlist: playlist.tracks });
        }
    }
}
