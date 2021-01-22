import React from 'react'
const SchedulerCardDayBadge = ({enable, day}) => (
    <span className={`badge rounded-circle border border-secondary m-1 rounded-pill ${enable ? "bg-secondary" : "text-dark bg-transparent"}`}>
        {day}
    </span>
)

export default SchedulerCardDayBadge;