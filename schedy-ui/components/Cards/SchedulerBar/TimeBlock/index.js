import { getPercentage } from '../../../../helpers/helpers';

const TimeBlock = ({ start, end, value }) => (
  <>
    <li
      style={{
        left: `${getPercentage('00:00', start)}%`,
        width: `${getPercentage(start, end)}%`
      }}
    >
      {value}º
    </li>
    <style jsx>{`
      li {
        background-color: wheat;
        border-left: 2px solid white;
        padding: 0.5rem;
        overflow: hidden;
        position: absolute;
        text-align: center;
      }

      li:last-of-type {
        border-right: 2px solid white;
      }
    `}</style>
  </>
);

export default TimeBlock;
