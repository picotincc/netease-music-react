import React, { Component } from 'react';

import ServiceClient from "../service/ServiceClientP";

export default class PlayList extends Component {

    constructor (props) {
        super(props);
        this._selectedId = null;
        this.onSelectionChange = this.onSelectionChange.bind(this);
    }

    static defaultProps = {
        playlists: []
    }

    static propTypes = {
        playlists: React.PropTypes.array.isRequired
    }

    get selectedId()
    {
        return this._selectedId;
    }

    set selectedId(value)
    {
        if (value !== this._selectedId)
        {
            if (this._selectedId)
            {
                this.refs[this._selectedId].classList.remove("selected");
            }
            this._selectedId = value;
            this.refs[this._selectedId].classList.add("selected");
        }
    }

    render()
    {
        const playlists = this.props.playlists;
        const self = this;
        return (
            <ul className="nmr-play-list-view">
            {playlists.map((item, i) => {
                let id = item.id;
                return <li onClick={() => this.onSelectionChange(id)} ref={item.id} key={item.id}>{item.name}</li>
            })}
            </ul>
        );
    }

    componentDidMount()
    {

    }

    componentWillReceiveProps(nextProps)
    {
        if (this.selectedId === null)
        {
            const playlists = nextProps.playlists;
            if (Array.isArray(playlists) && playlists.length > 0)
            {
                this.onSelectionChange(playlists[0].id);
            }
        }
    }

    onSelectionChange(id)
    {
        this.props.handleClick(id);
        this.selectedId = id;
    }

}
