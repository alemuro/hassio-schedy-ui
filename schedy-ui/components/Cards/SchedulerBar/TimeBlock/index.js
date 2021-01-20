import { useEffect } from 'react';
import { getPercentage } from '../../../../helpers/helpers';

const TimeBlock = ({ start, end, value }) => {

  useEffect(() => {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })    
  }, [])

  return (
    <>
      <li
        className={(value == "OFF") && "off"}
        style={{
          left: `${getPercentage('00:00', start)}%`,
          width: `${getPercentage(start, end)}%`
        }}
        data-bs-toggle="tooltip" data-bs-placement="top" title={`${value}${value != "OFF" ? "º" : ""}. ${start}-${end}`}
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
  )
}

export default TimeBlock;
