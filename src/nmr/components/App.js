import React, { Component } from 'react'

export default class App extends Component {
    componentDidMount = () => {
        console.log("App is running");
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
