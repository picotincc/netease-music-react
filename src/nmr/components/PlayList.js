import React, { Component } from 'react';

import ServiceClient from "../service/ServiceClientP";

export default class PlayList extends Component {

    constructor (props) {
        super(props);
        this._selectedId = null;
        this.onSelectionChange = this.onSelectionChange.bind(this);

        this._loaderUserPlayLists();
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

    shouldComponentUpdate(nextProps, nextState)
    {
        // console.log(nextProps, this.props, nextState, this.state);
        if (nextState.playLists === this.state.playLists)
        {
            // console.log("false");
            return false;
        }
        return true;
    }

    componentWillReceiveProps(nextProps)
    {
        ServiceClient.getInstance().getUserPlayLists().then(res => {
            this.setState({ playLists: res });
            this.onSelectionChange(res[0].id);
        });
    }

    onSelectionChange(id)
    {
        ServiceClient.getInstance().getPlayListDetail(id).then(res => {
            this.props.handleClick(res.tracks);
            this.selectedId = id;
        });
    }

}
