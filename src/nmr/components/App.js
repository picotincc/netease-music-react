import React, { Component } from 'react';
import ReactPlayer from "react-player";

import Player from "./Player";
import PlayList from "./PlayList";
import ServiceClient from "../service/ServiceClientP";
import TrackTable from "./TrackTable";

export default class App extends Component {

    constructor(props) {
        super(props);
        console.log("App is running");
        this.handlePlayListClick = this.handlePlayListClick.bind(this);
        this.handleSongClick = this.handleSongClick.bind(this);
    }

    static defaultProps = {
        userId: ""
    }

    static propTypes = {
        userId: React.PropTypes.string.isRequired
    }

    state = {
        selectedPlayList: [],
        selectedSong: null
    }

    render() {
        return (
          <div className="nmr-app">
                <header>
                    <div className="logo"></div>
                    <h1>网易云音乐</h1>
                </header>
                <main>
                    <aside className="sidebar">
                        <PlayList userId={this.props.userId} handleClick={this.handlePlayListClick}/>
                    </aside>
                    <section className="content">
                        <TrackTable playlist={this.state.selectedPlayList} handleClick={this.handleSongClick}/>
                    </section>
                </main>
                <footer>
                    <Player song={this.state.selectedSong}/>
                </footer>
          </div>
        )
    }

    componentDidMount()
    {

    }

    handlePlayListClick(id)
    {
        if(id && id !== "")
        {
            ServiceClient.getInstance().getPlayListDetail(id).then(playlist => {
                this.setState({ selectedPlayList: playlist.tracks });
            });
        }
    }

    handleSongClick(song)
    {
        ServiceClient.getInstance().getSongDetail(song.id).then(res => {
            this.setState({
                selectedSong: res[0]
            });
        });
    }

}
