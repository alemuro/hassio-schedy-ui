import React from 'react'

export default class RemoveRoom extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            roomName: props.name,
            form: {
                temperature: "",
                fromHour: "",
                toHour: "",
                weekdays: {
                    monday: true,
                    tuesday: true,
                    wednesday: true,
                    thursday: true,
                    friday: true,
                    saturday: true,
                    sunday: true
                }
            },
            formControl: {
                temperature: true,
                fromHour: true,
                toHour: true,
                global: false
            }
        }
        this._listRooms = props.listRooms
        this._createSchedulerRoom = async () => {
            if (this.state.formControl.global) {
                const weekdays = []
                for (let i = 0; i < Object.keys(this.state.form.weekdays).length; ++i) {
                    const day = Object.keys(this.state.form.weekdays)[i]
                    console.log(`day: ${day}`)
                    if (this.state.form.weekdays[day]) {
                        weekdays.push((i + 1).toString())
                    }
                }
                console.log({
                        name: this.state.roomName,
                        temperature: this.state.form.temperature,
                        fromHour: this.state.form.fromHour,
                        toHour: this.state.form.toHour,
                        weekdays: weekdays
                    })
                await fetch('api/createSchedulerRoom', {
                    method: 'POST',
                    body: JSON.stringify({
                        name: this.state.roomName,
                        temperature: this.state.form.temperature,
                        fromHour: this.state.form.fromHour,
                        toHour: this.state.form.toHour,
                        weekdays: weekdays
                    })
                })
                this._listRooms()
            }
        }
        this._enableSubmit = async () => {
            const formControl = this.state.formControl
            formControl.global = formControl.temperature && formControl.fromHour && formControl.toHour
            await this.setState({ formControl: formControl })
        }
        this._setWeekday = async (e) => {
            const form = this.state.form
            form.weekdays[e.target.id] = !this.state.form.weekdays[e.target.id]
            await this.setState(form)
            console.log(form)
            this._enableSubmit()
        }
        this._setTemperature = async (temperature) => {
            const r = RegExp('^((([0-3]{1})?)[0-9]{1}((\.[0-9]{1,2})?))$')
            if (r.test(temperature)) {
                const formControl = this.state.formControl
                formControl.temperature = true
                const form = this.state.form
                form.temperature = temperature
                await this.setState({
                    formControl: formControl,
                    form: form
                })
            } else {
                const formControl = this.state.formControl
                formControl.temperature = false
                await this.setState({
                    formControl: formControl
                })
            }
            this._enableSubmit()
        }
        this._setFromHour = async (fromHour) => {
            const r = RegExp('^(([0-1][0-9])|([0-2][0-3]))\:[0-5][0-9]$')
            if (r.test(fromHour)) {
                const formControl = this.state.formControl
                formControl.fromHour = true
                const form = this.state.form
                form.fromHour = fromHour
                await this.setState({
                    formControl: formControl,
                    form: form
                })
            } else {
                const formControl = this.state.formControl
                formControl.fromHour = false
                await this.setState({
                    formControl: formControl
                })
            }
            this._enableSubmit()
        }
        this._setToHour = async (toHour) => {
            const r = RegExp('^(([0-1][0-9])|([0-2][0-3]))\:[0-5][0-9]$')
            if (r.test(toHour)) {
                const formControl = this.state.formControl
                formControl.toHour = true
                const form = this.state.form
                form.toHour = toHour
                await this.setState({
                    formControl: formControl,
                    form: form
                })
            } else {
                const formControl = this.state.formControl
                formControl.toHour = false
                await this.setState({
                    formControl: formControl
                })
            }
            this._enableSubmit()
        }
    }

    render() {
        return (
            <div className="modal fade" id={"createSchedulerRoomModal-" + this.state.roomName} tabindex="-1" aria-labelledby={"createSchedulerRoomModalLabel-" + this.state.roomName} aria-hidden="true">
                < div className="modal-dialog" >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Create scheduler</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>



                                <div className="mb-3">
                                    <label htmlFor="roomName" className="form-label">Room name</label>
                                    <input className="form-control" id="roomName" aria-describedby="roomNameHelp" disabled={true} value={this.state.roomName} />
                                </div>



                                <div className="mb-3">
                                    <label htmlFor="temperature" className="form-label">Temperature</label>
                                    <input
                                        className="form-control"
                                        id="temperature"
                                        aria-describedby="temperatureHelp"
                                        onChange={(e) => this._setTemperature(e.target.value)}
                                        placeholder="20.5" />
                                    {this.state.formControl.temperature == false && (
                                        <div id="temperatureHelp" className="form-text text-danger">Must be a number between 0 and 39 and up to two decimals.</div>
                                    )}
                                </div>



                                <div className="mb-3">
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="fromHour" className="form-label">From</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="fromHour"
                                                placeholder="15:00"
                                                onChange={(e) => this._setFromHour(e.target.value)} />
                                            {this.state.formControl.fromHour == false && (
                                                <div id="fromHourHelp" className="form-text text-danger">Must match expression HH:mm.</div>
                                            )}
                                        </div>
                                        <div className="col">
                                            <label htmlFor="toHour" className="form-label">To</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="toHour"
                                                placeholder="22:00"
                                                onChange={(e) => this._setToHour(e.target.value)} />
                                            {this.state.formControl.toHour == false && (
                                                <div id="toHourHelp" className="form-text text-danger">Must match expression HH:mm.</div>
                                            )}
                                        </div>
                                    </div>
                                </div>



                                <div className="mb-3">
                                    <label className="form-label">Weekdays</label>
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="monday"
                                            checked={this.state.form.weekdays.monday}
                                            onChange={(e) => this._setWeekday(e)} />
                                        <label className="form-check-label" htmlFor="monday">Monday</label>
                                    </div>
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="tuesday"
                                            checked={this.state.form.weekdays.tuesday}
                                            onChange={(e) => this._setWeekday(e)} />
                                        <label className="form-check-label" htmlFor="tuesday">Tuesday</label>
                                    </div>
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="wednesday"
                                            checked={this.state.form.weekdays.wednesday}
                                            onChange={(e) => this._setWeekday(e)} />
                                        <label className="form-check-label" htmlFor="wednesday">Wednesday</label>
                                    </div>
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="thursday"
                                            checked={this.state.form.weekdays.thursday}
                                            onChange={(e) => this._setWeekday(e)} />
                                        <label className="form-check-label" htmlFor="thursday">Thursday</label>
                                    </div>
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="friday"
                                            checked={this.state.form.weekdays.friday}
                                            onChange={(e) => this._setWeekday(e)} />
                                        <label className="form-chec
                                        k-label" htmlFor="friday">Friday</label>
                                    </div>
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="saturday"
                                            checked={this.state.form.weekdays.saturday}
                                            onChange={(e) => this._setWeekday(e)} />
                                        <label className="form-check-label" htmlFor="saturday">Saturday</label>
                                    </div>
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="sunday"
                                            checked={this.state.form.weekdays.sunday}
                                            onChange={(e) => this._setWeekday(e)} />
                                        <label className="form-check-label" htmlFor="sunday">Sunday</label>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                disabled={!this.state.formControl.global}
                                onClick={() => this._createSchedulerRoom()}
                                data-bs-dismiss="modal">Create</button>
                        </div>
                    </div>
                </div >
            </div >
        )
    }
}
