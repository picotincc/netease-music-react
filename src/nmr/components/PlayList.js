import React, { Component } from 'react';

import ServiceClient from "../service/ServiceClient";

export default class PlayList extends Component {

    constructor (props) {
        super(props);
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
            {playlists.map((item, i) => {
                let id = item.id;
                return <li onClick={() => self.props.handleClick(id)} key={item.id}>{item.name}</li>
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
}
