import React, { Component } from 'react'

export default class Demo extends Component {
    componentDidMount = () => {
        alert('Welcome to React demos!!!')
        console.log($("#root"));
    }
    render() {
        return (
          <div>
                <span>Hello</span>
                <span>React</span>
          </div>
        )
    }
}
