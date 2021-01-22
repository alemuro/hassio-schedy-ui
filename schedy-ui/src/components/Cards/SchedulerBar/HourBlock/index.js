import { getPercentage } from '../../../../helpers/helpers';

const HourBlock = ({ start, end, value }) => (
  <>
    <li
      style={{
        left: `${getPercentage('00:00', start)}%`,
        width: `${getPercentage(start, end)}%`
      }}
    >
      {getPercentage(start, end) > 7.5 && 
        <>{start}</>
      }
    </li>
    <style jsx>{`
      li {
        font-size: 0.7rem;
        padding: 0.5rem;
        overflow: hidden;
        position: absolute;
        text-align: left;
      }
    `}</style>
  </>
);

export default HourBlock;
