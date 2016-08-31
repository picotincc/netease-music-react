import React, { Component } from 'react';

import ServiceClient from "../service/ServiceClient";

export default class App extends Component {
    componentDidMount = () => {
        console.log("App is running");
        this.run();
    }

    async run()
    {
        // api.search('年度之歌',data => {
        //     console.log(data)
        // });
        const userId = await ServiceClient.getInstance().login();
        console.log(userId);
        const playlist = await ServiceClient.getInstance().getUserPlayLists();
        console.log(playlist);
        // ServiceClient.getInstance().getUserPlayListsByPromise();
    }

    render() {
        return (
          <div className="nmr-app">
                <header>
                    <div className="logo"></div>
                    <h1>网易云音乐</h1>
                </header>
                <main>
                    <aside className="sidebar"></aside>
                    <section className="content"></section>
                </main>
                <footer></footer>
          </div>
        )
    }
}
