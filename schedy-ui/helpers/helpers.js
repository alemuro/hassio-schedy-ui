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

export {getMinutesSinceNoon, getPercentage};
