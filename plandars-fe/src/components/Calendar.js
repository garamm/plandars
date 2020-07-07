import React from 'react';
import './Calendar.css';
import CalendarItem from './CalendarItem.js';

class Calendar extends React.Component {

    state = {
        text: '',
        dateList: [],
        weekCount6: false
    };

    onUpdatePick = e => {
        e.preventDefault();
        this.props.onUpdatePick(this.state.text);
    }

    makeCalendarList(yyyy, m) {
        var newDateList = [];

        var firstDate = new Date(yyyy, m - 1, 1);
        let lastDate = new Date(yyyy, m, 0);

        // 당월 첫날의 요일 구하기 (일요일부터 시작)
        let firstDayOfWeek = firstDate.getDay();
        let prevDate = new Date(new Date(yyyy, m - 1, 1).setDate(new Date(yyyy, m - 1, 1).getDate() - 1));
        let prevYear = new Date(new Date(yyyy, m - 1, 1).setDate(new Date(yyyy, m - 1, 1).getDate() - 1)).getFullYear();
        let prevMonth = new Date(new Date(yyyy, m - 1, 1).setDate(new Date(yyyy, m - 1, 1).getDate() - 1)).getMonth() + 1;


        // 전월 데이터 채우기
        if (firstDayOfWeek !== 0) { // 당월 1일이 일요일이 아니면 앞에 전월 데이터를 추가해야하기 때문
            for (var i = 0; i < firstDayOfWeek; i++) {
                newDateList.unshift({
                    year: prevYear,
                    month: this.makeTwoString(prevMonth),
                    day: prevDate.getDate() - i,
                    type: "prev",
                    schedule: [],
                    isHoliday: false
                });
            }
        }

        // 당월 데이터 채우기
        for (var i = 1; i <= lastDate.getDate(); i++) {
            newDateList.push({
                year: yyyy,
                month: this.makeTwoString(m),
                day: this.makeTwoString(i),
                type: "now",
                schedule: [],
                isHoliday: false
            });
        }

        // 당월 마지막날의 요일 구하기 (일요일부터 시작)
        let lastDayOfWeek = lastDate.getDay();
        let nextYear = new Date(new Date(yyyy, m, 0).setDate(new Date(yyyy, m, 0).getDate() + 1)).getFullYear();
        let nextMonth = new Date(new Date(yyyy, m, 0).setDate(new Date(yyyy, m, 0).getDate() + 1)).getMonth() + 1;

        // 다음월 데이터 채우기
        if (lastDayOfWeek !== 6) { // 당월 마지막날짜가 토요일이 아니면 나머지 공간을 채워줘야하기 때문
            for (var i = 0; i < 6 - lastDayOfWeek; i++) {
                newDateList.push({
                    year: nextYear,
                    month: this.makeTwoString(nextMonth),
                    day: "0" + (i + 1),
                    type: "next",
                    schedule: [],
                    isHoliday: false
                });
            }
        }

        // 달력에 몇주까지 표기할건지 계산
        if (newDateList.length > 35) {
            this.state.weekCount6 = true;
        } else {
            this.state.weekCount6 = false;
        }

        this.state.dateList = newDateList;
        this.drawCalendar();
    }

    drawCalendar() {
        console.log(this.dateList);
    }

    makeTwoString(num) { // 한자리수 숫자 1을 두자리수 문자열 "01"로 변환
        var temp = num;
        if (temp < 10) {
            temp = "0" + num;
        }
        return temp;
    }

    constructor(props) {
        super(props);
        this.makeCalendarList(this.props.pickYear, this.props.pickMonth);
    }

    render() {
        return (
            <div className="Calendar">
                {this.props.pickMonth}<br />
                <input
                    value={this.state.text}
                    onChange={(e) => { this.setState({ text: e.target.value }) }} />
                <button onClick={this.onUpdatePick}>set</button>
                <div className="weekWrapper">
                    <span className="dateItem">SUN</span>
                    <span className="dateItem">MON</span>
                    <span className="dateItem">TUE</span>
                    <span className="dateItem">WED</span>
                    <span className="dateItem">THU</span>
                    <span className="dateItem">FRI</span>
                    <span className="dateItem">SAT</span>
                </div>

                <div className="dateWrapper">
                    {this.state.dateList.map((date, i) => {
                        if (this.state.weekCount6) {
                            return (<div className="dateItem week6">
                                <CalendarItem date={date} key={i} />
                            </div>);
                        } else {
                            return (<div className="dateItem week5">
                                <CalendarItem date={date} key={i} />
                            </div>);
                        }

                    })}
                </div>


            </div>
        );
    }
}

export default Calendar;