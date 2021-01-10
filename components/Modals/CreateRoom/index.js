import React from 'react'

export default class CreateRoom extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            validRoomNameForm: true,
            validActuatorForm: true,
            name: "",
            actuator: ""
        }
        this._listRooms = props.listRooms
        this._setName = async (name) => {
            const r = RegExp('^[a-zA-Z0-9]*$')
            if (r.test(name)) {
                await this.setState({ validRoomNameForm: true, name: name })
            } else {
                await this.setState({ validRoomNameForm: false })
            }
        }
        this._setActuator = async (actuator) => {
            const r = RegExp('^climate\.[a-zA-Z0-9_-]*$')
            if (r.test(actuator)) {
                await this.setState({ validActuatorForm: true, actuator: actuator })
            } else {
                await this.setState({ validActuatorForm: false })
            }
        }
        this._createRoom = async () => {
            if (this.state.validRoomNameForm) {
                await fetch('api/createRoom', {
                    method: 'POST',
                    body: JSON.stringify({ name: this.state.name })
                })
                this.setState({ name: "" })
                this._listRooms()
            }
        }
    }

    render() {
        return (
            <div className="modal fade" id="createRoomModal" tabindex="-1" aria-labelledby="createRoomModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Room</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div class="mb-3">
                                    <label for="roomName" class="form-label">Room name</label>
                                    <input class="form-control" id="roomName" aria-describedby="roomNameHelp" onChange={(e) => this._setName(e.target.value)} />
                                    {this.state.validRoomNameForm == false && (
                                        <div id="roomNameHelp" class="form-text text-danger">Only alphanumeric characters allowed.</div>
                                    )}
                                </div>
                                <div class="mb-3">
                                    <label for="climateActuatorName" class="form-label">Climate actuator</label>
                                    <input class="form-control" id="climateActuatorName" aria-describedby="climateActuatorNameHelp" onChange={(e) => this._setActuator(e.target.value)} />
                                    {this.state.validActuatorForm == false && (
                                        <div id="climateActuatorNameHelp" class="form-text text-danger">Must begin with climate.</div>
                                    )}
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" disabled={!this.state.validRoomNameForm || !this.state.validActuatorForm} data-bs-dismiss="modal" onClick={() => this._createRoom()}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
