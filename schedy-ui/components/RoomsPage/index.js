import React from 'react'

import styles from '../../styles/SchedulerCard.module.css'

import RoomsMenu from '../RoomsMenu'
import RoomDetail from '../RoomDetail'
import SchedulerCard from '../SchedulerCard'
import CreateRoomModal from '../Modals/CreateRoom'

export default class RoomsPage extends React.Component {

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
      <div>
        <RoomsMenu />
        <div className="container bg-light p-0">
          <div className="row">
            <div className="col-5">

              <table class="table table-hover p-0 m-0">
                <tbody>
                  <tr>
                    <SchedulerCard start="01:00" end="03:00" value="20.3" unit="ºC" />
                  </tr>
                  <tr>
                    <SchedulerCard start="01:00" end="03:00" value="20.3" unit="ºC" />
                  </tr>
                  <tr>
                    <SchedulerCard start="01:00" end="03:00" value="20.3" unit="ºC" />
                  </tr>
                  <tr>
                    <div className={`card text-center pt-3 pb-5 border-0 ${styles.card}`}>
                      <span className="fs-5">+ Add scheduler</span>
                    </div>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-7">
              <RoomDetail />
            </div>
          </div>


        </div>
      </div >
    )
  }
}
