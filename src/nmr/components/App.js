import React, { Component } from 'react';

import ServiceClient from "../service/ServiceClient";

export default class App extends Component {
    componentDidMount = () => {
        console.log("App is running");
        this.run();
    }

    async run()
    {
        const userId = await ServiceClient.getInstance().login();
        console.log(userId);
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
