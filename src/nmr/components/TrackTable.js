import React, { Component } from 'react';
import { connect } from 'react-redux';

import { activeSelectedSong, activePlayingList, activePlayer } from '../actions/SongAction';
import TimeUtil from "../util/TimeUtil";

class TrackTable extends Component {

    constructor (props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    state = {
        selectedId: null
    }

    componentWillReceiveProps(nextProps)
    {
        if (nextProps.selectedSong)
        {
            this.setState({
                selectedId: nextProps.selectedSong.id
            })
        }
    }

    handleClick(id)
    {
        const selectedId = this.state.selectedId;
        if (id !== selectedId)
        {
            const song = this.props.playlist.find(item => item.id === id);
            this.handleSongClick(song);
        }
    }

    handleSongClick(song)
    {
        const {dispatch, playlist, selectedSong} = this.props;
        dispatch(activeSelectedSong(song));
        dispatch(activePlayer(true));
        dispatch(activePlayingList(playlist));
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
                            let time = TimeUtil.formatPlayTime(item.lMusic ? item.lMusic.playTime : item.dt);
                            let artists = item.ar || item.artists;
                            let album = item.al || item.album;
                            return (
                                <tr key={i} className={selectedClass} onClick={() => this.handleClick(item.id)}>
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

function mapStateToProps(state) {
    let playlist = [];
    if (state.selectedPlayList)
    {
        playlist = state.selectedPlayList.tracks ? state.selectedPlayList.tracks : state.selectedPlayList.songs;
    }
    return {
        playlist,
        selectedSong: state.selectedSong,
        isPlaying: state.isPlaying
    };
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(mapStateToProps)(TrackTable);
