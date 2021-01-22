import { useEffect, useState } from 'react';
import TimeBlock from './TimeBlock';
import { getSegments } from '../../../helpers/helpers';
import HourBlock from './HourBlock';

const SchedulerBar = ({ schedulers = null }) => {

  const [segments, setSegments] = useState([])

  useEffect(() => {
    setSegments(getSegments(schedulers))
  }, [])

  if (!schedulers) return false;

  return (
    <>
      <ol className="schedulers">
        {segments.length > 0 && segments.map(timeblock => timeblock.start && (
          <TimeBlock start={timeblock.start} end={timeblock.end} value={timeblock.v} />
        ))}
      </ol>
      <ol>
        {segments.length > 0 && segments.map(timeblock => timeblock.start && (
          <HourBlock start={timeblock.start} end={timeblock.end} />
        ))}
      </ol>
      <style jsx>{`
        ol {
          height: 40px;
          list-style: none;
          margin: 0;
          padding: 0;
          position: relative;
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default SchedulerBar;
