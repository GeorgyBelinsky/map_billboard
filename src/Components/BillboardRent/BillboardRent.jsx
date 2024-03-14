import picture from '../../assets/picture.png';
import DatePicker from 'react-datepicker';
import { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import './index.css';

const BillboardRent = ({ board, selectedDates, setSelectedDates }) => {
  const [dayCostSum,setDayCostSum] =  useState(0);

  const setDates = (dates) => {
    const [start, end] = dates;
    if (selectedDates.some((bord) => bord.billboardId === board.billboardId)) {
      setSelectedDates((prev) =>
        prev.map((boardDate) =>
          boardDate.billboardId === board.billboardId
            ? { ...boardDate, startDate: start, endDate: end }
            : boardDate
        )
      );
    } else {
      setSelectedDates((prev) => [
        ...prev.filter((bord) => bord.billboardId !== board.billboardId),
        { billboardId: board.billboardId, startDate: start, endDate: end },
      ]);
    }
  };


  useEffect(() => {
    const date1 = initialStartDate;
    const date2 = initialEndDate;

    const filteredDates = board.rentalDates.filter(date => {
      const currentDate = new Date(date);
      return currentDate > date1 && currentDate < date2;
    });

    const daysDifference = Math.ceil(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24)) + 1 - filteredDates.length;
    setDayCostSum(date2 != null ? daysDifference * board.dayCost : 0);
  }, [selectedDates])


  // Check if the board is already selected
  const selectedBoard = selectedDates.find((bord) => bord.billboardId === board.billboardId);

  // Set initial values based on whether the board is already selected
  const initialStartDate = selectedBoard ? selectedBoard.startDate : null;
  const initialEndDate = selectedBoard ? selectedBoard.endDate : null;

  return (
    <div className="billboard_rent">
      <div className="text_container">
        <div className="board_top">
          <img src={picture} className="board_icon" />
          <div className="general_description">
            <div className="board_identificator">
              <div className="id_container">{board.billboardId}</div>
              <div className="title_container">{board.adress}</div>
            </div>
            <div className="coordinates_container">
              {"coordinates: " + board.latitude + " | " + board.longitude}
            </div>
            <p className="price">{board.dayCost}$/day</p>
          </div>
        </div>
        <div className="description_container">{board.description}</div>
      </div>
      <div className="date_pick_continer">
        <DatePicker
          className="date_picker"
          onChange={setDates}
          startDate={initialStartDate}
          endDate={initialEndDate}
          excludeDates={board.rentalDates.map((date) => new Date(date).setHours(0, 0, 0, 0))}
          selectsRange
          inline
        />
          <div className="calc_price">Your price:
          <p>{dayCostSum}$</p>
        </div>
      </div>
    </div>
  );
};

export default BillboardRent;