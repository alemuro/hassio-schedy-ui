import { getPercentage } from '../../../../helpers/helpers';

const TimeBlock = ({ start, end, value }) => (
  <>
    <li
      className={(value == "OFF") && "off"}
      style={{
        left: `${getPercentage('00:00', start)}%`,
        width: `${getPercentage(start, end)}%`
      }}
    >
      {getPercentage(start, end) > 7.5 && 
        <>{value}{value != "OFF" ? "º" : ""}</>
      }
    </li>
    <style jsx>{`
      li {
        background-color: wheat;
        border-left: 2px solid white;
        padding: 0.5rem;
        overflow: hidden;
        position: absolute;
        text-align: center;
        height: 40px;
      }

      li:last-of-type {
        border-right: 2px solid white;
      }

      .off {
        background-color: rgba(0,0,0,.05);
      }
    `}</style>
  </>
);

export default TimeBlock;
