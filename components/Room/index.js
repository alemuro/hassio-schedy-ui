import React from 'react'

import RemoveRoomModal from '../Modals/RemoveRoom'

export default class Room extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name
        }
        this._listRooms = props.listRooms
        this._removeRoom = async () => {
            await fetch('api/removeRoom', {
                method: 'POST',
                body: JSON.stringify({ name: this.state.name })
            })
            this._listRooms()
        }
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{this.state.name}</h5>
                    <p class="card-text">Lorem ipsum</p>
                    <a href="#" class="link-danger" data-bs-toggle="modal" data-bs-target={"#removeRoomModal-" + this.state.name}>Remove</a>
                </div>
                <RemoveRoomModal
                    removeRoom={this._removeRoom}
                    name={this.state.name} />
            </div>
        )
    }
}
