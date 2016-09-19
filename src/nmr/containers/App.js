import React, { Component } from 'react';
import { connect } from 'react-redux';

import PlayList from "../components/PlayList";
import ServiceClient from "../service/ServiceClientP";
import TrackTable from "../components/TrackTable";
import { login, loadUserPlayLists, activeSelectedPlayList } from '../actions/actions';


class App extends Component {

    constructor(props) {
        super(props);
        console.log("App is running");

        this._login();
        this._loadUserPlayLists();
    }

    static defaultProps = {
        userId: "",
        userPlayLists: [],
        selectedPlayList: []
    }

    static propTypes = {
        userId: React.PropTypes.string.isRequired,
        userPlayLists: React.PropTypes.array,
        selectedPlayList: React.PropTypes.array
    }

    render() {
        const {dispatch, userPlayLists, selectedPlayList} = this.props;
        return (
          <div className="nmr-app">
                <header>
                    <div className="logo"></div>
                    <h1>网易云音乐</h1>
                </header>
                <main>
                    <aside className="sidebar">
                        <PlayList
                            playlists={userPlayLists}
                            handleClick={playlistId => dispatch(activeSelectedPlayList(playlistId))}
                        />
                    </aside>
                    <section className="content">
                        <TrackTable playlist={selectedPlayList} />
                    </section>
                </main>
                <footer></footer>
          </div>
        )
    }

    componentDidMount()
    {

    }

    _login()
    {
        const userId = "78843035";
        const dispatch = this.props.dispatch;
        dispatch(login(userId));
    }

    _loadUserPlayLists()
    {
        const dispatch = this.props.dispatch;
        dispatch(loadUserPlayLists());
    }
}

function mapStateToProps(state) {
  return {
      userId: state.userId,
      userPlayLists: state.playlists,
      selectedPlayList: state.playlist
  };
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(mapStateToProps)(App);
