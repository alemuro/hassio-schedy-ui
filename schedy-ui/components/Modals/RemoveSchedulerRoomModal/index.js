import React from 'react'

const RemoveSchedulerRoomModal = ({roomName, schedulerName}) => {

    const removeSchedulerRoom = () => {
        document.dispatchEvent(new CustomEvent('removeSchedulerRoom', {detail: {
            roomName: roomName,
            schedulerName: schedulerName
        }}))
    }

    return (
        <div className="modal fade" id={`removeSchedulerRoomModal-${schedulerName}`} tabIndex="-1" aria-labelledby={`removeSchedulerRoomModalLabel-${schedulerName}`} aria-hidden="true">
            <div className="modal-dialog" >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirm</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        You are going to remove the scheduler?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={removeSchedulerRoom}>Remove</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RemoveSchedulerRoomModal;