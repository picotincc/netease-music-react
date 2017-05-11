import React, { Component } from 'react';
import { connect } from 'react-redux';

import PlayList from "../components/PlayList";
import SearchBar from "../components/SearchBar";
import PlayListDetail from "../components/PlayListDetail";
import TrackTable from "../components/TrackTable";
import Player from "../components/Player";
import { login } from '../actions/UserAction';
import { loadUserPlayLists, activeSelectedPlayList, search } from '../actions/PlayListAction';
import { activeSelectedSong, activePlayingList, activePlayer } from '../actions/SongAction';



class App extends Component {

    constructor(props) {
        super(props);
        console.log("App is running");
    }

    async componentDidMount()
    {
        const userId = "78843035";
        const dispatch = this.props.dispatch;

        dispatch(login(userId));
        try {
            await dispatch(loadUserPlayLists(userId));
        } catch (e) {
            console.log(e);
        }

        Ps.initialize(this.sidebar);
        Ps.initialize(this.content);

    }

    render() {
        const {dispatch, userPlayLists, selectedPlayList, selectedSong, isPlaying} = this.props;
        let playlist = [];
        if (selectedPlayList && selectedPlayList.tracks) {
            playlist = selectedPlayList.tracks;
        }
        if (selectedPlayList && selectedPlayList.songs) {
            playlist = selectedPlayList.songs;
        }

        return (
          <div className="nmr-app">
                <header>
                    <div className="logo"></div>
                    <h1>网易云音乐</h1>
                    <div className="search-section">
                        <SearchBar onSearch={keyword => dispatch(search(keyword))}/>
                    </div>
                </header>
                <main>
                    <div className="sidebar" ref={(sidebar) => this.sidebar = sidebar}>
                        <PlayList
                            playlists={userPlayLists}
                            onPlayListClick={playlistId => dispatch(activeSelectedPlayList(playlistId))}
                        />
                    </div>
                    <section className="content" ref={(content) => this.content = content}>
                        <PlayListDetail playlist={selectedPlayList} />

                        <TrackTable/>
                    </section>
                </main>
                <footer>
                    <Player/>
                </footer>
          </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userId: state.userId,
        userPlayLists: state.playlists,
        selectedPlayList: state.selectedPlayList,
        playingList: state.playingList,
        selectedSong: state.selectedSong
    };
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(mapStateToProps)(App);
