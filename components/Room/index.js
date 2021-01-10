import React from 'react'

import CreateSchedulerRoomModal from '../Modals/CreateSchedulerRoom'
import RemoveRoomModal from '../Modals/RemoveRoom'

export default class Room extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            actors: Object.keys(props.actors),
            schedule: props.schedule
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
                    <p class="card-text">
                        <b>Actors</b>
                        {this.state.actors.map((value) => {
                            return (
                                <p>{value}</p>
                            )
                        })}
                        <table class="table">
                            <thead>
                                <tr>
                                <th scope="col">Value</th>
                                <th scope="col">Start</th>
                                <th scope="col">End</th>
                                <th scope="col">Weekdays</th>
                                <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.schedule.map((value, index) => {
                                    const weekdays = []
                                    const weekdaysReceived = value.weekdays || ""
                                    console.log(`weekdays: ${weekdaysReceived}`)
                                    for (let day of weekdaysReceived.split(",")) {
                                        if (day == "1") weekdays.push("Monday")
                                        if (day == "2") weekdays.push("Tuesday")
                                        if (day == "3") weekdays.push("Wednesday")
                                        if (day == "4") weekdays.push("Thursday")
                                        if (day == "5") weekdays.push("Friday")
                                        if (day == "6") weekdays.push("Saturday")
                                        if (day == "7") weekdays.push("Sunday")
                                    }
                                    return (
                                    <tr key={value.name}>
                                        <td>{value.v}</td>
                                        <td>{value.start}</td>
                                        <td>{value.end}</td>
                                        <td>{weekdays.map((value) => {
                                            return (
                                                <p>{value}</p>
                                            )
                                        })}</td>
                                        <td></td>
                                    </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                        {JSON.stringify(this.state)}
                    </p>
                    <a href="#" 
                        class="link-primary" 
                        data-bs-toggle="modal" 
                        data-bs-target={`#createSchedulerRoomModal-${this.state.name}`}>Add scheduler</a>
                    <br />
                    <a href="#" 
                        class="link-danger" 
                        data-bs-toggle="modal" 
                        data-bs-target={`#removeRoomModal-${this.state.name}`}>Remove</a>
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
