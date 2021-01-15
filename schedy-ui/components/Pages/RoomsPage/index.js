import React, { useEffect, useState } from 'react'

import styles from '../../../styles/SchedulerCard.module.css'

import RoomsMenu from '../../RoomsMenu'
import RoomDetail from '../../RoomDetail'
import SchedulerCard from '../../Cards/SchedulerCard'
import CreateSchedulerRoomModal from '../../Modals/CreateSchedulerRoomModal'

const RoomsPage = () => {

  const [rooms, setRooms] = useState([])
  const [selectedRoom, setSelectedRoom] = useState(0)
  
  useEffect(() => {
    listRooms()
    document.addEventListener('listRooms', listRooms)
    document.addEventListener('removeRoom', (roomName) => {
      removeRoom(roomName)
    })
    document.addEventListener('selectRoom', (e) => {
      setSelectedRoom(e.detail)
    })
    document.addEventListener('removeSchedulerRoom', (e) => {
      removeSchedulerRoom(e.detail.roomName, e.detail.schedulerName)
    })
  }, [])

  const listRooms = async () => {
    fetch('api/listRooms')
      .then(res => res.json())
      .then(res => {
        if (selectedRoom > res.length || selectedRoom < 0)
          setSelectedRoom(0)
        setRooms(res)
      })
  } 

  const removeRoom = async (e) => {
    fetch('api/removeRoom', {
        method: 'POST',
        body: JSON.stringify({ name: e.detail })
    })
    await setSelectedRoom(0)
    listRooms()
  }

  const removeSchedulerRoom = async (roomName, schedulerName) => {
    await fetch('api/removeSchedulerRoom', {
      method: 'POST',
      body: JSON.stringify({
        roomName: roomName, 
        schedulerName: schedulerName
      })
    })
    listRooms()
  }

  return (
    <div>
      <RoomsMenu rooms={rooms} selectedRoom={selectedRoom} />
      <div className="container bg-light p-0">
        <div className="row">
          <div className="col-lg-5 border-end">
            {rooms.length > 0 && 
              (<table className="table table-hover p-0 m-0">
                <tbody>
                  {rooms[selectedRoom].schedule.map((v, i) => {
                    return v.start && (
                      <tr>
                        <SchedulerCard 
                          roomName={rooms[selectedRoom].name}
                          key={`${v.start}-${v.end}-${i}-${v.v}`} 
                          start={v.start} 
                          end={v.end} 
                          value={v.v} 
                          name={v.name}
                          weekdays={v.weekdays}
                          unit="ºC" />
                      </tr>
                    )
                  })}
                  <tr>
                    <div className={`card text-center pt-3 pb-5 border-0 ${styles.card}`} data-bs-toggle="modal" data-bs-target="#createSchedulerRoomModal">
                      <span className="fs-5">+ Add scheduler</span>
                    </div>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
          <div className="col-lg-7">
            {rooms.length > 0 &&
              (<RoomDetail room={rooms[selectedRoom]} />)
            }
          </div>
        </div>
      </div>
      {rooms.length > 0 &&
        <CreateSchedulerRoomModal roomName={rooms[selectedRoom].name} />
      }
    </div >
  )
}

export default RoomsPage