import React from 'react'

export default class CreateRoom extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            validRoomNameForm: true,
            validActorForm: true,
            name: "",
            actor: ""
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
        this._setActor = async (actor) => {
            const r = RegExp('^climate\.[a-zA-Z0-9_-]*$')
            if (r.test(actor)) {
                await this.setState({ validActorForm: true, actor: actor })
            } else {
                await this.setState({ validActorForm: false })
            }
        }
        this._createRoom = async () => {
            if (this.state.validRoomNameForm && this.state.validActorForm) {
                await fetch('api/createRoom', {
                    method: 'POST',
                    body: JSON.stringify({
                        name: this.state.name,
                        actor: this.state.actor
                    })
                })
                this.setState({
                    name: "",
                    actor: ""
                })
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
                                <div className="mb-3">
                                    <label htmlFor="roomName" className="form-label">Room name</label>
                                    <input className="form-control" id="roomName" aria-describedby="roomNameHelp" onChange={(e) => this._setName(e.target.value)} />
                                    {this.state.validRoomNameForm == false && (
                                        <div id="roomNameHelp" className="form-text text-danger">Only alphanumeric characters allowed.</div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="climateActorName" className="form-label">Climate actor</label>
                                    <input className="form-control" id="climateActorName" aria-describedby="climateActorNameHelp" onChange={(e) => this._setActor(e.target.value)} />
                                    {this.state.validActorForm == false && (
                                        <div id="climateActorNameHelp" className="form-text text-danger">Must begin with climate.</div>
                                    )}
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" disabled={!this.state.validRoomNameForm || !this.state.validActorForm} data-bs-dismiss="modal" onClick={() => this._createRoom()}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
