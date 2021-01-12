import React from 'react'

import Icon from '@mdi/react'
import { mdiCalendarClock } from '@mdi/js';

export default class SchedulerCardDayBadge extends React.Component {

    constructor(props) {
        super(props)
        this.state = { ...props }
    }

    render() {
        return (
            <span class={`badge rounded-circle border border-secondary m-1 rounded-pill ${this.state.enable ? "bg-secondary" : "text-dark bg-transparent"}`}>
                {this.state.day}
            </span>
        )
    }
}