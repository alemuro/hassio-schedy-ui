import React from 'react'

const RemoveRoomModal = ({name}) => {

    const removeRoom = () => {
        document.dispatchEvent(new CustomEvent('removeRoom', {detail: name}))
    }

    return (
        <div className="modal fade" id="removeRoomModal" tabindex="-1" aria-labelledby="removeRoomModalLabel" aria-hidden="true">
            <div className="modal-dialog" >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirm</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        You are going to remove the room labeled as <b>{name}</b>. Do you confirm?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={removeRoom}>Remove</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RemoveRoomModal;