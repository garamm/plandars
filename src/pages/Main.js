import React from 'react';
import Header from '../components/Header';
import Calendar from '../components/Calendar';
import Side from '../components/Side';

const Main = () => {
    return (
        <div>
            <Header />
            <div className="flex_row">
                <div className="flex_1 wrap_calendar">
                    <Calendar />
                </div>
                <div className="wrap_side view_pc">
                    <Side />
                </div>
                
            </div>
            
        </div>
    );
};

export default Main;