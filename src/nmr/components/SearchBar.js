import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { AutoComplete } from 'antd';

import ServiceClient from "../service/ServiceClient";
import { activeSelectedSong } from '../actions/PlayListAction';



class SearchBar extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.inputEvent = null;
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
            if (!this.inputEvent) {
                this.inputEvent = setTimeout(async () => {
                    const res = await ServiceClient.getInstance().search(value, true);
                    if (res.songs) {
                        const names = res.songs.map(item => {
                            return {
                                value: item.id,
                                text: item.name
                            }
                        });
                        this.setState({
                            dataSource: names
                        });
                    }
                }, 500);
            } else {
                clearTimeout(this.inputEvent);
                this.inputEvent = setTimeout(async () => {
                    const res = await ServiceClient.getInstance().search(value, true);
                    if (res.songs) {
                        const names = res.songs.map(item => {
                            return {
                                value: item.id,
                                text: item.name
                            }
                        });
                        this.setState({
                            dataSource: names
                        });
                    }
                }, 500);
            }
        }
    }

    handleSelect(value)
    {
        if (value.trim() !== "") {
            const song = this.state.dataSource.find(item => item.value == value);
            this.props.onSearch(song.text);
        }
    }


    render() {
        return (
          <div className="nmr-search-bar">
              <AutoComplete
                  className="nmr-autocomplete"
                  style={{ width: 200 }}
                  dataSource={this.state.dataSource}
                  onChange={this.handleChange}
                  onSelect={this.handleSelect}
                  placeholder="搜索歌曲"
              />
          </div>
        )
    }

}

export default SearchBar;
