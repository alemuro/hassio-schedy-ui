import React, { useState } from 'react'

const CreateSchedulerRoomModal = ({roomName}) => {

    const [form, setForm] = useState({
        temperature: "",
        fromHour: "",
        toHour: "",
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true
    })

    const [formControl, setFormControl] = useState({
        temperature: true,
        fromHour: true,
        toHour: true,
        global: false
    })

    const days = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday"
    ]

    const createSchedulerRoom = async () => {
        if (formControl.global) {
            const weekdays = []
            for (let i = 0; i < days.length; ++i) {
                const day = days[i]
                if (form[day]) {
                    weekdays.push((i + 1).toString())
                }
            }
            await fetch('api/createSchedulerRoom', {
                method: 'POST',
                body: JSON.stringify({
                    name: roomName,
                    temperature: form.temperature,
                    fromHour: form.fromHour,
                    toHour: form.toHour,
                    weekdays: weekdays
                })
            })
            document.dispatchEvent(new Event('listRooms'))
        }
    }

    const enableSubmit = () => {
        setFormControl({
            ...formControl,
            global: formControl.temperature && formControl.fromHour && formControl.toHour
        })
    }

    const setWeekday = (e) => {
        const aux = form
        aux[e.target.id] = !form[e.target.id]
        setForm(aux)
        enableSubmit()
    }

    const setTemperature = (e) => {
        const temperature = e.target.value
        const r = RegExp('^((([0-3]{1})?)[0-9]{1}((\.[0-9]{1,2})?))$')
        setForm({
            ...form,
            temperature: (r.test(temperature)) ? temperature : form.temperature
        })
        setFormControl({
            ...formControl,
            temperature: r.test(temperature)
        })
        enableSubmit()
    }

    const setFromHour = (e) => {
        const fromHour = e.target.value
        const r = RegExp('^(([0-1][0-9])|([0-2][0-3]))\:[0-5][0-9]$')
        setForm({
            ...form,
            fromHour: (r.test(fromHour)) ? fromHour : form.fromHour
        })
        setFormControl({
            ...formControl,
            fromHour: r.test(fromHour)
        })
        enableSubmit()
    }

    const setToHour = (e) => {
        const toHour = e.target.value
        const r = RegExp('^(([0-1][0-9])|([0-2][0-3]))\:[0-5][0-9]$')
        setForm({
            ...form,
            toHour: (r.test(toHour)) ? toHour : form.toHour
        })
        setFormControl({
            ...formControl,
            toHour: r.test(toHour)
        })
        enableSubmit()
    }


    return (
        <div className="modal fade" id="createSchedulerRoomModal" tabindex="-1" aria-labelledby="createSchedulerRoomModalLabel" aria-hidden="true">
            <div className="modal-dialog" >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Create scheduler</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="roomName" className="form-label">Room name</label>
                                <input className="form-control" id="roomName" aria-describedby="roomNameHelp" disabled={true} value={roomName} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="temperature" className="form-label">Temperature</label>
                                <input
                                    className="form-control"
                                    id="temperature"
                                    aria-describedby="temperatureHelp"
                                    onChange={setTemperature}
                                    placeholder="20.5" />
                                {formControl.temperature == false && (
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
                                            onChange={setFromHour} />
                                        {formControl.fromHour == false && (
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
                                            onChange={setToHour} />
                                        {formControl.toHour == false && (
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
                                        checked={form.monday}
                                        onChange={setWeekday} />
                                    <label className="form-check-label" htmlFor="monday">Monday</label>
                                </div>
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="tuesday"
                                        checked={form.tuesday}
                                        onChange={setWeekday} />
                                    <label className="form-check-label" htmlFor="tuesday">Tuesday</label>
                                </div>
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="wednesday"
                                        checked={form.wednesday}
                                        onChange={setWeekday} />
                                    <label className="form-check-label" htmlFor="wednesday">Wednesday</label>
                                </div>
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="thursday"
                                        checked={form.thursday}
                                        onChange={setWeekday} />
                                    <label className="form-check-label" htmlFor="thursday">Thursday</label>
                                </div>
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="friday"
                                        checked={form.friday}
                                        onChange={setWeekday} />
                                    <label className="form-chec
                                    k-label" htmlFor="friday">Friday</label>
                                </div>
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="saturday"
                                        checked={form.saturday}
                                        onChange={setWeekday} />
                                    <label className="form-check-label" htmlFor="saturday">Saturday</label>
                                </div>
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="sunday"
                                        checked={form.sunday}
                                        onChange={setWeekday} />
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
                            disabled={!formControl.global}
                            onClick={createSchedulerRoom}
                            data-bs-dismiss="modal">Create</button>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default CreateSchedulerRoomModal