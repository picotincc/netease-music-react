import React, { Component } from 'react';

import PlayList from "./PlayList";
import ServiceClient from "../service/ServiceClient";

export default class App extends Component {

    constructor(props) {
        super(props);
        console.log("App is running");
        this.run();
    }

    static defaultProps = {
        userId: ""
    }

    static propTypes = {
        userId: React.PropTypes.string.isRequired
    }

    state = {
        playlist: []
    }

    render() {
        console.log();
        return (
          <div className="nmr-app">
                <header>
                    <div className="logo"></div>
                    <h1>网易云音乐</h1>
                </header>
                <main>
                    <aside className="sidebar">
                        <PlayList userId={this.props.userId} />
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

    async run()
    {
        console.log(this.props.userId + "app");
        // const playlist = await ServiceClient.getInstance().getUserPlayLists();
        // console.log(playlist);
    }
}
