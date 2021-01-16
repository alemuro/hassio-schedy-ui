const getMinutesSinceNoon = (time) => {
    const h = parseInt(time.split(":")[0]) * 60;
    const m = parseInt(time.split(":")[1]);

  return h + m;
}

const getPercentage = (start, end) => {
  const day = 1440;
  const init = getMinutesSinceNoon(start);
  const stop = getMinutesSinceNoon(end);

  return (((stop - init) / day) * 100);
}


const getSchedulersByDay = (schedulers, day) => {
  const schedulerResponse = []
  for (let scheduler of schedulers) {
    if (scheduler.weekdays == undefined || scheduler.weekdays.indexOf(day.toString()) != -1) 
      schedulerResponse.push(scheduler)
  }
  return schedulerResponse
}

const getSegments = (schedulers) => {
  console.log("getSegments")
  const normalizedSchedulers = []
  for (let scheduler of schedulers) {
    normalizedSchedulers.push({
      v: scheduler.v,
      start: scheduler.start || "00:00",
      end: scheduler.end || "23:59",
      name: scheduler.name || "undefined"
    })
  }
  normalizedSchedulers.reverse()
  
  const segments = [normalizedSchedulers[0]] // ini

  // process schedules from yaml
  for (let i = 0; i < normalizedSchedulers.length; ++i) {
    const schedule = normalizedSchedulers[i]
    // compare them against the segments array
    for (let j = 0; j < segments.length; ++j) {
      const segment = segments[j]
      // solapament total, el nou preval
      if (schedule.start <= segment.start && schedule.end >= segment.end) {
        // eliminem l'objecte solapat
        segments.splice(j, 1)
        // afegim l'objecte sencer
        segments.push(schedule) 
      }

      // el nou cap dins del existent
      if (schedule.start > segment.start && schedule.end < segment.end) {
        // eliminem l'objecte que és solapat
        segments.splice(j, 1) 
        segments.push({ ...segment, end: schedule.start })
        segments.push(schedule)
        segments.push({ ...segment, start: schedule.end })

        normalizedSchedulers.splice(i, 0, { ...segment, end: schedule.start })
        normalizedSchedulers.splice(i, 0, { ...schedule })
        normalizedSchedulers.splice(i, 0, { ...segment, start: schedule.end })
      }

      // el nou comença abans i es solapa parcialment
      if (schedule.start < segment.start && schedule.end > segment.start && schedule.end < segment.end) {
        // eliminem l'objecte que és solapat
        segments.splice(j, 1) 
        segments.push(schedule)
        segments.push({...segment, start: schedule.end, })
        normalizedSchedulers.splice(i, 0, { ...schedule })
        normalizedSchedulers.splice(i, 0, { ...segment, start: schedule.end })
      }

      // el nou acaba després i es solapa parcialment
      if (schedule.end > segment.end && schedule.start > segment.start && schedule.start < segment.end) {
        // eliminem l'objecte que és solapat
        segments.splice(j, 1) 
        segments.push({ ...segment, end: schedule.start, })
        normalizedSchedulers.splice(i, 0, { ...segment, end: schedule.start })
        normalizedSchedulers.splice(i, 0, { ...schedule })
      }

    }
  }

  segments.sort((a, b) => {
    if ( getMinutesSinceNoon(a.start) < getMinutesSinceNoon(b.start) ){
      return -1;
    }
    if ( getMinutesSinceNoon(a.start) > getMinutesSinceNoon(b.start) ){
      return 1;
    }
    return 0;
  })

  return segments
}

export {getMinutesSinceNoon, getPercentage, getSegments, getSchedulersByDay};
