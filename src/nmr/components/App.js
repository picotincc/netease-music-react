import React, { Component } from 'react';

import PlayList from "./PlayList";
import ServiceClient from "../service/ServiceClient";

export default class App extends Component {

    constructor(props) {
        super(props);
        console.log("App is running");
        this.handlePlayListClick = this.handlePlayListClick.bind(this);
    }

    static defaultProps = {
        userId: ""
    }

    static propTypes = {
        userId: React.PropTypes.string.isRequired
    }

    state = {
        selectedPlayList: null
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
                    <section className="content"></section>
                </main>
                <footer></footer>
          </div>
        )
    }

    componentDidMount()
    {

    }

    handlePlayListClick(id, e)
    {
        console.log(id);
    }
}
