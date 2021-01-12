import styles from '../../styles/RoomsMenu.module.css'

import React from 'react'

import RoomCard from '../RoomCard'
import CreateRoomModal from '../Modals/CreateRoom'

export default class RoomsMenu extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      rooms: {},
      loading: true
    }
    this._listRooms = async () => {
      await this.setState({ rooms: {}, loading: true })
      fetch('api/listRooms')
        .then(res => res.json())
        .then(res => {
          this.setState({ rooms: res, loading: false })
        })
    }
  }

  componentDidMount() {
    this._listRooms()
  }

  render() {
    return (
      <div className={`container-fluid ${styles.roomsMenu}`}>
        <div className="container py-3">
          <button type="button" className="btn btn-light" data-bs-toggle="modal" data-bs-target="#createRoomModal"> + Add room</button>
          <div className="row">
            {Object.keys(this.state.rooms).map((value, index) => {
              return (
                <div className="col-lg-3 col-md-6">
                  <RoomCard
                    key={value}
                    listRooms={this._listRooms}
                    actors={this.state.rooms[value].actors}
                    schedule={this.state.rooms[value].schedule}
                    selected={value == "Menjador"}
                    name={value} />
                </div>
              )
            })}
          </div>
        </div>
        <CreateRoomModal
          listRooms={this._listRooms} />
      </div>
    )
  }
}
