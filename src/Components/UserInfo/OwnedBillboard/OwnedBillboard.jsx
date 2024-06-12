import './index.css';
import TEST_INCON from "../../../assets/picture.png";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

const OwnedBillboard = ({ billboard }) => {

    return (
        <div className="billboard_container">
            <DatePicker
                className="user_date_picker"
                excludeDates={billboard?.rentalDates?.map((date) => new Date(date).setHours(0, 0, 0, 0))}
                inline

            />
            <div className="user_billboard_info">
                <div className='user_billboard_header'>
                    <div className="user_billboard_image">
                        <figure className="user_image_container">
                            <img src={TEST_INCON} />
                        </figure>
                    </div>
                    <div className='numeral_info'>
                        <div className='coordinate_info'>{billboard.latitude}-{billboard.longitude}</div>
                        <div className='price_info'>{billboard.dayCost + '$ / ' + billboard.rentalDates?.length * billboard.dayCost + '$'}</div>
                    </div>
                </div>
                <p className='address_info'>{billboard.adress}</p>
                <p className='description_info'>{billboard.description}</p>

            </div>
        </div>
    );
}

export default OwnedBillboard;