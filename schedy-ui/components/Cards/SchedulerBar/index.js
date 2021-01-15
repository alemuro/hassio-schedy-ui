import TimeBlock from './TimeBlock';

const SchedulerBar = ({ schedulers = null }) => {
  if (!schedulers) return false;

  return (
    <>
      <ol>
        {schedulers.map(timeblock => timeblock.start && (
          <TimeBlock start={timeblock.start} end={timeblock.end} value={timeblock.v} />
        ))}
      </ol>
      <style jsx>{`
        ol {
          background-color: rgba(0,0,0,.05);
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
