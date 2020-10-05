import React, { Component } from 'react'
import axios from 'axios';
export default class Test extends Component {
    state = {
        persons: []
    }
    componentDidMount() {
        axios.get(`http://localhost:5000/api/v1/bootcamps`)
            .then(res => {
                console.log(res.data.data);
                const persons = res.data.data;
                this.setState({ persons });
            })
    }
    render() {
        console.log('aaa: ', this.state.persons);
        return (
            <div>
                <ul>
                    { this.state.persons.map(person => <li key={person.id}>{person.name}</li>)}
                </ul>
            </div>
        )
    }
}
