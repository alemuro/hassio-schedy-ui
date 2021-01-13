import React from 'react'

import Icon from '@mdi/react'
import { mdiCalendarClock } from '@mdi/js';

import styles from '../../../styles/SchedulerCard.module.css'
import SchedulerCardDayBadge from '../SchedulerCardDayBadge'

// export default class SchedulerCard extends React.Component {
const SchedulerCard = ({start, end, value, unit, weekdays}) => (
    <div className={`card ps-3 rounded-0 border-bottom border-start-0 border-end-0 border-top-0 ${styles.card}`}>
        <div className="card-body">
            <div className="row">
                <div className="col-lg-1 d-flex align-items-center align-items-center text-secondary">
                    <div>
                        <Icon path={mdiCalendarClock} title="clock" size="32px" />
                    </div>
                </div>
                <div className="col-lg-11">
                    <div className="row">
                        <div className="col-3 offset-1 px-3">
                            <small>Start </small><br /><span className="fs-3">{start}</span>
                        </div>
                        <div className="col-3 px-3">
                            <small>End </small><br /><span className="fs-3">{end}</span>
                        </div>
                        <div className="col-4 px-3 text-end">
                            <small>Value </small><br /><span className="fs-3">{value}{unit}</span>
                        </div>
                        <div className="col-11 offset-1">
                            <SchedulerCardDayBadge enable={weekdays.indexOf("1") != -1} day="Mo" />
                            <SchedulerCardDayBadge enable={weekdays.indexOf("2") != -1} day="Tu" />
                            <SchedulerCardDayBadge enable={weekdays.indexOf("3") != -1} day="We" />
                            <SchedulerCardDayBadge enable={weekdays.indexOf("4") != -1} day="Th" />
                            <SchedulerCardDayBadge enable={weekdays.indexOf("5") != -1} day="Fr" />
                            <SchedulerCardDayBadge enable={weekdays.indexOf("6") != -1} day="Sa" />
                            <SchedulerCardDayBadge enable={weekdays.indexOf("7") != -1} day="Su" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default SchedulerCard;