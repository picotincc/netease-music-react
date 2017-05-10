import React, { Component } from 'react';
import { connect } from 'react-redux';

import PlayList from "../components/PlayList";
import SearchBar from "../components/SearchBar";
import TrackTable from "../components/TrackTable";
import Player from "../components/Player";
import { login } from '../actions/UserAction';
import { loadUserPlayLists, activeSelectedPlayList, search } from '../actions/PlayListAction';
import { activeSelectedSong } from '../actions/SongAction';



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
    }

    render() {
        const {dispatch, userPlayLists, selectedPlayList, selectedSong} = this.props;
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
                    <aside className="sidebar">
                        <PlayList
                            playlists={userPlayLists}
                            onPlayListClick={playlistId => dispatch(activeSelectedPlayList(playlistId))}
                        />
                    </aside>
                    <section className="content">
                        <TrackTable
                            playlist={selectedPlayList}
                            onSongClick={song => dispatch(activeSelectedSong(song))}
                        />
                    </section>
                </main>
                <footer>
                    <Player song={selectedSong}/>
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
      selectedSong: state.selectedSong
  };
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(mapStateToProps)(App);
