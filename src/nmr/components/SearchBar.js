import React, { Component } from 'react';
import { connect } from 'react-redux';

import { activeSelectedSong } from '../actions/SongAction';



class SearchBar extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        searchInput: ""
    }

    componentDidMount()
    {

    }

    render() {
        return (
          <div className="nmr-search-bar">
              <span className="icon iconfont icon-search"/>
              <input type="search" placeholder="搜索音乐" />
          </div>
        )
    }

}

export default SearchBar;
