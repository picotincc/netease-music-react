import React, { Component } from 'react';

import ServiceClient from "../service/ServiceClientP";

export default class PlayList extends Component {

    constructor (props) {
        super(props);
        this._selectedId = "";
        this.onSelectionChange = this.onSelectionChange.bind(this);

        this._loaderUserPlayLists();
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
        const playlists = this.state.playLists;
        const self = this;
        return (
            <ul className="nmr-play-list-view">
            {playlists.map((item, i) => {
                let id = item.id;
                return (<li onClick={() => this.onSelectionChange(id)}
                           ref={item.id}
                           key={item.id}>
                           <span className="icon iconfont icon-playlist"></span>
                           <span className="text">{item.name}</span>
                        </li>);
            })}
            </ul>
        );
    }

    componentDidMount()
    {
        // this._loaderUserPlayLists();
    }

    shouldComponentUpdate(nextProps, nextState)
    {
        if (nextState.playLists === this.state.playLists)
        {
            return false;
        }
        return true;
    }

    _loaderUserPlayLists()
    {
        ServiceClient.getInstance().getUserPlayLists().then(res => {
            this.setState({ playLists: res });
            this.onSelectionChange(res[0].id);
        });
    }

    onSelectionChange(id)
    {
        this.props.handleClick(id);
        this.selectedId = id;
    }

}
