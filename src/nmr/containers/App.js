import React, { Component } from 'react';
import { connect } from 'react-redux';

import PlayList from "../components/PlayList";
import SearchBar from "../components/SearchBar";
import PlayListDetail from "../components/PlayListDetail";
import TrackTable from "../components/TrackTable";
import Player from "../components/Player";
import { login } from '../actions/UserAction';
import { loadUserPlayLists, activeSelectedPlayList, search } from '../actions/PlayListAction';
import { activeSelectedSong, activePlayingList } from '../actions/SongAction';



class App extends Component {

    constructor(props) {
        super(props);
        console.log("App is running");

        this.handleSongClick = this.handleSongClick.bind(this);
        this.handleSongSwitch = this.handleSongSwitch.bind(this);
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

    handleSongClick(song)
    {
        const {dispatch, userPlayLists, selectedPlayList, selectedSong} = this.props;
        let playlist = [];
        if (selectedPlayList && selectedPlayList.tracks) {
            playlist = selectedPlayList.tracks;
        }
        if (selectedPlayList && selectedPlayList.songs) {
            playlist = selectedPlayList.songs;
        }
        dispatch(activeSelectedSong(song));
        dispatch(activePlayingList(playlist));
    }

    handleSongSwitch(tag)
    {
        const { dispatch, playingList, selectedSong } = this.props;
        const list = playingList.map((item, i) => {
            return {
                index: i,
                id: item.id
            }
        });

        const item = list.find(s => s.id == selectedSong.id);
        if (tag === "prev")
        {
            if (item.index > 0) {
                dispatch(activeSelectedSong(playingList[item.index - 1]));
            }
        }
        else
        {
            if (item.index < playingList.length - 1) {
                dispatch(activeSelectedSong(playingList[item.index + 1]));
            }
        }
    }

    render() {
        const {dispatch, userPlayLists, selectedPlayList, selectedSong} = this.props;
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

                        <TrackTable
                            selectedSong={selectedSong}
                            playlist={playlist}
                            onSongClick={this.handleSongClick}
                        />
                    </section>
                </main>
                <footer>
                    <Player
                        song={selectedSong}
                        onSongSwitch={this.handleSongSwitch}
                    />
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
