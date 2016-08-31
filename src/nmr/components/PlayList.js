import React, { Component } from 'react';

import ServiceClient from "../service/ServiceClient";

export default class PlayList extends Component {

    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    static defaultProps = {
        userId: ""
    }

    static propTypes = {
        userId: React.PropTypes.string.isRequired
    }

    state = {
        playLists: []
    }

    render()
    {
        const playlists = this.state.playLists;
        const self = this;
        return (
            <ul className="nmr-play-list-view">
            {playlists.map(function(item) {
                return <li onClick={self.handleClick} key={item.id}>{item.name}</li>
            })}
            </ul>
        );
    }

    componentDidMount()
    {
        this._loaderUserPlayLists();
    }

    async _loaderUserPlayLists()
    {
        const playlists = await ServiceClient.getInstance().getUserPlayLists();
        this.setState({ playLists: playlists });
    }

    handleClick(e)
    {
        console.log(e);
    }
}
