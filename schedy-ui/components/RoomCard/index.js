import React from 'react'

import styles from '../../styles/RoomsMenu.module.css'

import CreateSchedulerRoomModal from '../Modals/CreateSchedulerRoom'
import RemoveRoomModal from '../Modals/RemoveRoom'

export default class Room extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            actors: Object.keys(props.actors),
            schedule: props.schedule,
            selected: props.selected
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
            <div className={`card border-0 my-3 ${this.state.selected ? "bg-light shadow" : styles.notSelected }`}>
                <div className="card-body">
                    <div className="row">
                        <div className="col-7">
                            <h5 class="card-title">{this.state.name}</h5>
                            {this.state.actors.map((value) => {
                                return (
                                    <h6 class="card-subtitle mb-2">{value}</h6>
                                )
                            })}
                        </div>
                        <div className="col-5 text-end fs-2">
                            20.5ºC
                      </div>
                    </div>
                </div>
                <CreateSchedulerRoomModal
                    listRooms={this._listRooms}
                    name={this.state.name} />
                <RemoveRoomModal
                    removeRoom={this._removeRoom}
                    name={this.state.name} />
            </div>
        )
    }
}
