import React, {useState} from 'react'

// export default class CreateRoom extends React.Component {

const CreateRoomModal = () => {

    const [form, setForm] = useState({
        validRoomNameForm: true,
        validActorForm: true,
        name: "",
        actor: ""  
    })

    const setName = (e) => {
        const name = e.target.value
        const r = RegExp('^[a-zA-Z0-9]*$')
        setForm({
            ...form,
            validRoomNameForm: r.test(name),
            name: r.test(name) ? name : form.name
        })
    }

    const setActor = (e) => {
        const actor = e.target.value
        const r = RegExp('^climate\.[a-zA-Z0-9_-]*$')
        setForm({
            ...form,
            validActorForm: r.test(actor),
            actor: r.test(actor) ? actor : form.actor
        })
    }

    const createRoom = async () => {
        if (form.validRoomNameForm && form.validActorForm) {
            await fetch('api/createRoom', {
                method: 'POST',
                body: JSON.stringify({
                    name: form.name,
                    actor: form.actor
                })
            })
            setForm({
                ...form,
                name: "",
                actor: ""
            })
            document.dispatchEvent(new Event('listRooms'))
        }
    }

    return (
        <div className="modal fade" id="createRoomModal" tabIndex="-1" aria-labelledby="createRoomModalLabel" aria-hidden="true">
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
                                <input className="form-control" id="roomName" aria-describedby="roomNameHelp" onChange={setName} />
                                {form.validRoomNameForm == false && (
                                    <div id="roomNameHelp" className="form-text text-danger">Only alphanumeric characters allowed.</div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="climateActorName" className="form-label">Climate actor</label>
                                <input className="form-control" id="climateActorName" aria-describedby="climateActorNameHelp" onChange={setActor} />
                                {form.validActorForm == false && (
                                    <div id="climateActorNameHelp" className="form-text text-danger">Must begin with climate.</div>
                                )}
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" disabled={!form.validRoomNameForm || !form.validActorForm} data-bs-dismiss="modal" onClick={createRoom}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateRoomModal