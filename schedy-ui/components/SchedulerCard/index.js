import styles from '../../styles/SchedulerCard.module.css'

import React from 'react'

import Icon from '@mdi/react'
import { mdiCalendarClock } from '@mdi/js';

import SchedulerCardDayBadge from '../SchedulerCardDayBadge'

export default class SchedulerCard extends React.Component {

    constructor(props) {
        super(props)
        this.state = { ...props }
    }

    render() {
        return (
            <div className={`card ps-3 rounded-0 border-bottom border-start-0 border-end-0 border-top-0 ${styles.card}`}>
                <div className="card-body">
                    <div className="row">
                        <div className="col-1 d-flex align-items-center text-secondary">
                            <div>
                                <Icon path={mdiCalendarClock} title="clock" size="32px" />
                            </div>
                        </div>
                        <div className="col-11">
                            <div className="row">
                                <div className="col-3 offset-1 px-3">
                                    <small>Start </small><br /><span className="fs-3">{this.state.start}</span>
                                </div>
                                <div className="col-3 px-3">
                                    <small>End </small><br /><span className="fs-3">{this.state.end}</span>
                                </div>
                                <div className="col-4 px-3 text-end">
                                    <small>Value </small><br /><span className="fs-3">{this.state.value}{this.state.unit}</span>
                                </div>
                                <div className="col-11 offset-1">
                                    <SchedulerCardDayBadge enable={true} day="Mo" />
                                    <SchedulerCardDayBadge enable={true} day="Tu" />
                                    <SchedulerCardDayBadge enable={true} day="We" />
                                    <SchedulerCardDayBadge enable={true} day="Th" />
                                    <SchedulerCardDayBadge enable={true} day="Fr" />
                                    <SchedulerCardDayBadge enable={false} day="Sa" />
                                    <SchedulerCardDayBadge enable={false} day="Su" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
