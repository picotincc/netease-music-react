import React, { Component } from 'react';
import { connect } from 'react-redux';

import { AutoComplete } from 'antd';

import ServiceClient from "../service/ServiceClientP";
import { activeSelectedSong } from '../actions/PlayListAction';



class SearchBar extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    state = {
        dataSource: []
    }

    componentDidMount()
    {

    }

    handleChange(value)
    {
        if (value.trim() !== "") {
            ServiceClient.getInstance().search(value, true).then(res => {
                const names = res.map(item => item.name);
                this.setState({
                    dataSource: names
                });
            });
        }
    }

    handleSelect(value)
    {
        if (value.trim() !== "") {
            this.props.onSearch(value);
        }
    }


    render() {
        return (
          <div className="nmr-search-bar">
              <AutoComplete
                  className="nmr-autocomplete"
                  dataSource={this.state.dataSource}
                  onChange={this.handleChange}
                  onSelect={this.handleSelect}
              />
          </div>
        )
    }

}

export default SearchBar;
