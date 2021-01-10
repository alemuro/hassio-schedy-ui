import React from 'react'

import Room from '../Room'
import CreateRoomModal from '../Modals/CreateRoom'

export default class RoomsPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      rooms: {},
      loading: true
    }
    this._listRooms = async () => {
      await this.setState({rooms: {}, loading: true})
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
      <div className="container">
        {/* Create room button */}
        <div className="container my-3">
          <button type="button" className="btn btn-secondary ms-1" data-bs-toggle="modal" data-bs-target="#createRoomModal"> + Add room</button>
          <button type="button" className="btn btn-light border ms-1" onClick={this._listRooms}>Reload</button>
        </div>
        {/* No available rooms warning */}
        {this.state.loading &&
          <div className="container my-3">
            <div class="alert alert-light">
              Loading...
            </div>
          </div>
        }
        {this.state.loading == false && Object.keys(this.state.rooms).length == 0 &&
          <div className="container my-3">
            <div class="alert alert-info" role="alert">
              There are no configured rooms
            </div>
          </div>
        }

        {/* List of available rooms */}
        <div className="container my-3">
          <div className="row">
            {Object.keys(this.state.rooms).map((value) => {
              return (
                <div className="col-lg-6 p-1">
                  <Room
                    key={value}
                    listRooms={this._listRooms}
                    actors={this.state.rooms[value].actors}
                    schedule={this.state.rooms[value].schedule}
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
