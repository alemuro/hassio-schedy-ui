import React from 'react'

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name
        }
    }

    render() {
        return (
            <div className="bg-light py-1">
                <h3 className="text-center">Schedy UI</h3>
            </div>
        )
    }
}
