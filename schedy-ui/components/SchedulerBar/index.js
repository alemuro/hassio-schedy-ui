import React from 'react'

export default class SchedulerBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            schedulers: props.schedulers,
            orderedSchedulers: []
        }
    }

    shouldSplit(a, b) {
        return ((b.start > a.start && b.start < a.end) ||
            (b.end > a.start && b.end < a.end) ||
            (b.start < a.start && b.end > a.end))
    }

    getPercentage(start, end) {
        const day = 1440
        return (((end - start) / day) * 100)
    }

    splitScheduler() {
        const events = {}
        let defaultStartEvent = { event: "end", value: "OFF", start: 0, end: 0, active: false }
        let defaultEndEvent = { event: "start", value: "OFF", start: 1440, end: 1440, active: false }
        // process events
        for (let scheduler of this.state.schedulers) {
            if (scheduler.end < scheduler.start) {
                defaultStartEvent = {
                    event: "start",
                    active: true,
                    value: scheduler.value,
                    start: 0,
                    end: scheduler.end,
                    name: scheduler.name
                }
                defaultEndEvent = {
                    event: "end",
                    active: true,
                    value: scheduler.value,
                    start: scheduler.start,
                    end: 1440,
                    name: scheduler.name
                }
            }
            events[scheduler.start] = {
                event: "start",
                active: true,
                value: scheduler.value,
                start: scheduler.start,
                end: scheduler.end,
                name: scheduler.name
            }
            events[scheduler.end] = {
                event: "end",
                active: true,
                value: scheduler.value,
                start: scheduler.start,
                end: scheduler.end,
                name: scheduler.name
            }
        }
        events[defaultEndEvent.start] = defaultEndEvent

        // create full scheduler array
        const orderedSchedulers = []
        for (let i = 1; i < Object.keys(events).length; ++i) {
            const prevEvent = defaultStartEvent
            if (i > 0) prevEvent = events[Object.keys(events)[i - 1]]
            const currEvent = events[Object.keys(events)[i]]

            if (prevEvent.event == "end" && currEvent.event == "start") {
                orderedSchedulers.push({
                    active: prevEvent.active,
                    value: prevEvent.value,
                    start: prevEvent.end,
                    end: currEvent.start
                })
            }

            if (prevEvent.event == "end" && currEvent.event == "end") {
                orderedSchedulers.push({
                    active: prevEvent.active,
                    value: prevEvent.value,
                    start: prevEvent.start,
                    end: currEvent.end
                })
            }

            if (prevEvent.event == "start" && currEvent.event == "start") {
                orderedSchedulers.push({
                    active: prevEvent.active,
                    value: prevEvent.value,
                    start: prevEvent.start,
                    end: currEvent.start
                })
            }

            if (prevEvent.event == "start" && currEvent.event == "end") {
                orderedSchedulers.push({
                    active: prevEvent.active,
                    value: prevEvent.value,
                    start: prevEvent.start,
                    end: currEvent.end
                })
            }
        }

        console.log("orderedschedulers", orderedSchedulers)
        this.setState({ orderedSchedulers: orderedSchedulers })
    }

    componentDidMount() {
        this.splitScheduler()
    }


    render() {
        return (
            <div class="progress" style={{ width: "100%" }}>
                {this.state.orderedSchedulers.map((v) => {
                    return (
                        v.active
                            ? <div class="progress-bar bg-warning" role="progressbar" style={{ width: `${this.getPercentage(v.start, v.end)}%` }} aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                            : <div class="progress-bar bg-transparent" role="progressbar" style={{ width: `${this.getPercentage(v.start, v.end)}%` }} aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                    )
                })}
            </div >
        )
    }
}
