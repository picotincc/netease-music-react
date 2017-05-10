import React, { Component } from 'react';

export default class PlayListDetail extends Component {

    constructor (props) {
        super(props);
    }

    static defaultProps = {
        playlist: null
    }

    render()
    {
        const playlist = this.props.playlist;
        if (!playlist) {
            return (
                <div className="play-list-detail"></div>
            );
        }

        if (playlist.songs) {
            return (
                <div className="play-list-detail">搜索相关歌曲</div>
            );
        }
        return (
                <div className="play-list-detail">
                    <img src={playlist.coverImgUrl}></img>
                    <div className="details">
                        <div className="title-bar">
                            <span className="logo">歌单</span>
                            <span className="title">{playlist.name}</span>
                            <div className="icon-track-count">
                                <span className="icon iconfont icon-music"></span>
                                <span className="text">{playlist.trackCount}</span>
                            </div>
                            <div className="icon-play-count">
                                <span className="icon iconfont icon-play"></span>
                                <span className="text">{playlist.playCount}</span>
                            </div>
                        </div>
                        <div className="creator-bar">
                            <img src={playlist.creator.avatarUrl}></img>
                            <div className="nickname">{playlist.creator.nickname}</div>
                            <div className="create-time">{this._formatTime(playlist.createTime)}</div>
                        </div>
                        <div className="tag-bar"><b>标签：</b>{playlist.tags.join(",")}</div>
                        <div className="intro"><b>简介：</b>{playlist.description}</div>
                    </div>
                </div>
            );
    }

    componentDidMount()
    {
        // this._loaderPlayList(this.props.playlistId);
    }

    componentWillReceiveProps(nextProps)
    {
        if (nextProps.playlist !== this.props.playlist)
        {
            this._selectedId = "";
        }
    }

    _formatTime(ts)
    {
        const d = new Date(ts);
        const y = d.getFullYear();
        const m = d.getMonth() > 9 ? d.getMonth() : "0" + d.getMonth();
        const day = d.getDate() > 9 ? d.getDate() : "0" + d.getDate();
        return y + "-" + m + "-" + day + "创建";
    }

}
