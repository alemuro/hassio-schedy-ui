import React from 'react'

import RoomsMenu from '../RoomsMenu'
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
              <div className="fs-3 px-3 py-1 bg-secondary text-light">Schedulers</div>
              <div className="card border-0 rounded-0">
                <div className="card-body">
                  <div className="row">
                    <div className="col-3 px-3">
                      <small>Start </small><br /><span className="fs-3">02:23</span>
                    </div>
                    <div className="col-3 px-3">
                      <small>End </small><br /><span className="fs-3">05:23</span>
                    </div>
                    <div className="col-3 px-3">
                      <small>Value </small><br /><span className="fs-3">20.5ºC</span>
                    </div>
                    <div className="col-12">
                      <span class="badge rounded-circle border border-secondary m-1 rounded-pill bg-secondary">Mo</span>
                      <span class="badge rounded-circle border border-secondary m-1 rounded-pill bg-secondary">Tu</span>
                      <span class="badge rounded-circle border border-secondary m-1 rounded-pill bg-secondary">We</span>
                      <span class="badge rounded-circle border border-secondary m-1 rounded-pill bg-secondary">Th</span>
                      <span class="badge rounded-circle border border-secondary m-1 rounded-pill bg-secondary">Fr</span>
                      <span class="badge rounded-circle border border-secondary m-1 rounded-pill text-dark bg-transparent">Sa</span>
                      <span class="badge rounded-circle border border-secondary m-1 rounded-pill text-dark bg-transparent">Su</span>
                    </div>
                  </div>
                </div>
              </div>


              <div className="card border-0 rounded-0">
                <div className="card-body">
                  <div className="row">
                    <div className="col-3 px-3">
                      <small>Start </small><br /><span className="fs-3">02:23</span>
                    </div>
                    <div className="col-3 px-3">
                      <small>End </small><br /><span className="fs-3">05:23</span>
                    </div>
                    <div className="col-3 px-3">
                      <small>Value </small><br /><span className="fs-3">20.5ºC</span>
                    </div>
                    <div className="col-12">
                      <span class="badge rounded-circle border border-secondary m-1 rounded-pill text-dark bg-transparent">Mo</span>
                      <span class="badge rounded-circle border border-secondary m-1 rounded-pill text-dark bg-transparent">Tu</span>
                      <span class="badge rounded-circle border border-secondary m-1 rounded-pill text-dark bg-transparent">We</span>
                      <span class="badge rounded-circle border border-secondary m-1 rounded-pill text-dark bg-transparent">Th</span>
                      <span class="badge rounded-circle border border-secondary m-1 rounded-pill text-dark bg-transparent">Fr</span>
                      <span class="badge rounded-circle border border-secondary m-1 rounded-pill bg-secondary">Sa</span>
                      <span class="badge rounded-circle border border-secondary m-1 rounded-pill bg-secondary">Su</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-7">

            </div>
          </div>


        </div>
      </div>
    )
  }
}
