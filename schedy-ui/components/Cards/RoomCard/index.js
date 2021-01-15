import React from 'react'

import styles from '../../../styles/RoomsMenu.module.css'

import CreateSchedulerRoomModal from '../../Modals/CreateSchedulerRoomModal'
import RemoveRoomModal from '../../Modals/RemoveRoomModal'

const RoomCard = ({ name, actors, selected, index }) => {

    const selectRoom = () => {
        document.dispatchEvent(new CustomEvent('selectRoom', {detail: index}))
    }

    return (
        <div className={`card border-0 my-3 ${selected ? "bg-light shadow" : styles.notSelected}`}>
            <div className="card-body" onClick={selectRoom}>
                <div className="row">
                    <div className="col-7">
                        <h5 className="card-title">{name}</h5>
                        {actors.map(v => <h6 key={`${name}-${v}`} className="card-subtitle mb-2">{v}</h6>)}
                    </div>
                    {/* <div className="col-5 text-end fs-2">
                        20.5ºC
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default RoomCard
