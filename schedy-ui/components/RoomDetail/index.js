import React from 'react'

import SchedulerBar from '../Cards/SchedulerBar'
import RemoveRoomModal from '../Modals/RemoveRoomModal'

// export default class RoomDetail extends React.Component {

const RoomDetail = ({room}) => {
    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ]

    return (
        <div className="p-5">
            <div className="text-center mb-5">
                <h3>{room.name}</h3>
                <span><i>{room.actors.toString()}</i></span>
            </div>
            <table className="table table-borderless">
                <tbody>
                    {days.map((v, i) => (
                      <tr key={i}>
                        <td className="w-25 align-top">{days[i]}</td>
                        <td className="w-75">
                            {/* <SchedulerBar schedulers={} /> */}
                        </td>
                      </tr>
                    ))}
                </tbody>
            </table>
            <div className="text-center mt-3">
                <a href="#" className="link-danger" data-bs-toggle="modal" data-bs-target="#removeRoomModal">Delete room</a>
            </div>
            <RemoveRoomModal key={room.name} name={room.name} />
        </div>
    )
}

export default RoomDetail
