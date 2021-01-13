import React from 'react'

import SchedulerBar from '../SchedulerBar'

export default class RoomDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            schedulers: [
                {
                    start: "01:00",
                    end: "09:00",
                    name: "test",
                    value: 20.3,
                    weekdays: ["1",]
                },
                {
                    start: "06:00",
                    end: "12:00",
                    name: "test2",
                    value: 20.5,
                    weekdays: ["2"]
                }, {
                    start: "23:00",
                    end: "01:30",
                    name: "test2",
                    value: 20.5,
                    weekdays: ["3"]
                }
            ],
            groupedSchedulers: {}
        }
        this.days = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        ]
    }

    getMinutesSinceNoon(time) {
        const h = parseInt(time.split(":")[0]) * 60
        const m = parseInt(time.split(":")[1])
        return h + m
    }

    getPercentage(start, end) {
        const day = 1440
        return (((end - start) / day) * 100)
    }

    groupByDay(schedulers) {
        let grouped = {}
        for (let day = 1; day <= 7; ++day) {
            console.log(`Finding day ${day}`)
            grouped[day] = []
            for (let scheduler of schedulers) {
                console.log(scheduler)
                if (scheduler.weekdays.indexOf(day.toString()) != -1) {
                    grouped[day].push({
                        start: this.getMinutesSinceNoon(scheduler.start),
                        end: this.getMinutesSinceNoon(scheduler.end),
                        value: scheduler.value,
                        name: scheduler.name
                    })
                }
            }
        }
        console.log(`grouped!: `, grouped)
        this.setState({ groupedSchedulers: grouped })
    }

    componentDidMount() {
        this.groupByDay(this.state.schedulers)
    }

    render() {
        return (
            <div className="p-5">
                <table class="table table-borderless">
                    <tbody>
                        {Object.keys(this.state.groupedSchedulers).map((v, i) => {
                            return (
                                <tr key={i}>
                                    <td className="w-25 align-top">{this.days[i]}</td>
                                    <td className="w-75">
                                        <SchedulerBar schedulers={this.state.groupedSchedulers[i + 1]} />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody >
                </table >

            </div >
        )
    }
}
