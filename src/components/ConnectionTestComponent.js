import React from 'react'
import axios from 'axios'

export default class ConnectionTestComponent extends React.Component {

    state = {
        value: ""
    }

    componentDidMount() {
        axios.get('localhost:8080/hello').then(response => {
            this.setState({value: response.data})
        })
    }
    



    render() {
        return(
            <div>
                <p>Poniżej jest informacja od serwera:</p>
                <p>{this.state.value}</p>
            </div>
        )
    }
}