import styles from '../../styles/RoomsMenu.module.css'

import React from 'react'

import RoomCard from '../Cards/RoomCard'
import CreateRoomModal from '../Modals/CreateRoomModal'

const RoomsMenu = ({rooms, selectedRoom}) => (
  <div className={`container-fluid ${styles.roomsMenu}`}>
    <div className="container py-3">
      <button type="button" className="btn btn-light" data-bs-toggle="modal" data-bs-target="#createRoomModal">+ Add room</button>
      <div className="row">
        {rooms.length > 0 && rooms.map((v, i) =>  (
          <div key={v} className="col-lg-3 col-md-6">
            <RoomCard
              selected={i == selectedRoom}
              actors={v.actors}
              schedule={v.schedule}
              index={i}
              name={v.name} />
          </div>
        ))}
      </div>
    </div>
    <CreateRoomModal />
  </div>
)

export default RoomsMenu
