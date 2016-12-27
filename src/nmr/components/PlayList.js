import React, { Component } from 'react';

import ServiceClient from "../service/ServiceClientP";

export default class PlayList extends Component {

    constructor (props) {
        super(props);
    }

    static defaultProps = {
        playlists: []
    }

    static propTypes = {
        playlists: React.PropTypes.array.isRequired
    }

    render()
    {
        const playlists = this.props.playlists;
        const self = this;
        return (
            <ul className="nmr-play-list-view">
            {playlists.map((item, i) => {
                let id = item.id;
                return <li ref={item.id} key={item.id}>{item.name}</li>
            })}
            </ul>
        );
    }

    componentDidMount()
    {

    }

}
