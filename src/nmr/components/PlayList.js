import React, { Component } from 'react';

export default class PlayList extends Component {

    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    state = {
        selectedId: null
    }

    componentWillReceiveProps(nextProps)
    {
        if (this.state.selectedId === null && nextProps.playlists.length > 0)
        {
            nextProps.onPlayListClick(nextProps.playlists[0].id);
            this.setState({
                selectedId: nextProps.playlists[0].id
            });
        }
    }

    render()
    {
        const playlists = this.props.playlists;
        const selectedId = this.state.selectedId;
        return (
            <ul className="nmr-play-list-view">
            {playlists.map((item, i) => {
                let selectedClass = (item.id === selectedId) ? "selected" : "";
                return <li onClick={() => this.handleClick(item.id)} className={selectedClass} ref={item.id} key={item.id}>
                    <span className="icon iconfont icon-playlist"></span>{item.name}
                </li>
            })}
            </ul>
        );
    }

    handleClick(id)
    {
        if (id !== this.state.selectedId)
        {
            this.setState({
                selectedId: id
            });
            this.props.onPlayListClick(id);
        }
    }

}
