import Header from "../components/Header.js";
import Content from "../components/Content.js";

import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setSelectedDate, updatePlist, setDetailPopup } from "../actions";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";


function make2digit(value) {
	if (Number(value) < 10) {
		return "0" + value;
	} else {
		return value;
	}
}

class Home extends React.Component {
	constructor(props) {
		super(props);

		this.handleClickOpen = this.handleClickOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleClickOpen() {
		this.props.setDetailPopup(true);
	}

	handleClose() {
		this.props.setDetailPopup(false);
	}

	getHoliday() {
		axios.get(this.props.baseURL + "/holiday", {
			params: {},
		}).then((response) => {
			if (response.status !== 200) {
				alert("휴일 데이터를 가져올 수 없습니다(1)");
			} else {
				console.log("휴일 데이터 조회 완료");
				var json = response.data;
				var list = [];
				console.log(json);
				if (json.resultCode === 200) {
				for (var i = 0; i < json.resultData.length; i++) {
					var item = json.resultData[i];
					list.push({
						sid: "", // 휴일은 스케쥴코드 공백
						title: item.h_title,
						cid: item.c_id,
						cname: item.c_name, // 카테고리명
						ccolor: item.c_color, // 카테고리 색상
						ctcolor: item.c_tcolor, // 카테고리 텍스트 색상
						calpha: item.c_alpha, // 카테고리 투명도
						cradius: item.c_radius, // 카테고리 둥근정도
						gid: "", // 휴일은 그룹아이디 공백
						start: item.h_start,
						end: item.h_end,
						lunar: item.h_lunar,
						type: "일정",
						chk: "",
						memo: "",
						addr: "",
						lat: "",
						lon: "",
						rest: item.h_rest, // 휴일 YN
					});
                }
                this.getCalendarData(list);
			} else {
				alert("휴일 데이터를 가져올 수 없습니다.");
				}
			}
		}).catch((error) => {
			alert("휴일 데이터를 가져올 수 없습니다(서버 접속 오류)");
			console.log(error);
		});
    }
    
    getCalendarData(list) {
		axios.get(this.props.baseURL + "/calendar", {
			params: {u_id: this.props.userId},
		}).then((response) => {
			if (response.status !== 200) {
				alert("일정 데이터를 가져올 수 없습니다(1)");
			} else {
				console.log("일정 데이터 조회 완료");
				var json = response.data;
				console.log(json);
				if (json.resultCode === 200) {
				for (var i = 0; i < json.resultData.length; i++) {
                    var item = json.resultData[i];
					list.push({
						sid: item.s_id,
						title: item.s_title,
						cid: item.c_id,
						cname: item.c_name, // 카테고리명
						ccolor: item.c_color, // 카테고리 색상
						ctcolor: item.c_tcolor, // 카테고리 텍스트 색상
						calpha: item.c_alpha, // 카테고리 투명도
						cradius: item.c_radius, // 카테고리 둥근정도
						gid: item.s_gid,
						start: item.s_start,
						end: item.s_end,
						lunar: item.s_lunar,
						type: item.s_type,
						chk: item.s_chk,
						memo: item.s_memo,
						addr: item.s_addr,
						lat: item.s_lat,
						lon: item.s_lon,
						rest: "N"
					});
                }
				this.props.updatePlist(list);
			} else {
				alert("일정 데이터를 가져올 수 없습니다.");
				}
			}
		}).catch((error) => {
			alert("일정 데이터를 가져올 수 없습니다(서버 접속 오류)");
			console.log(error);
		});
	}

  componentDidMount() {
    let today = new Date();
    let year = today.getFullYear();
    let month = make2digit(today.getMonth() + 1);
    let date = make2digit(today.getDate());
    this.props.setSelectedDate(year + "-" + month + "-" + date);
    this.getHoliday();
  }

  render() {
    return (
      <div className="App flex_column">
        <Header></Header>
        <div className="flex_1 flex_row app_body">
          <Content className="flex_1"></Content>
		  {/* 우측메뉴 안씀 */}
          {/* <span className={this.props.contentType === 'month' ? 'v_show' : 'v_hide'} >
			<Menu className="pc_tablet"></Menu>
		</span> */}
        </div>


        {/* <Button
          variant="contained"
          color="primary"
          onClick={this.handleClickOpen}
        >
          일정 상세 팝업
        </Button> */}

		{/* 일정 상세 팝업 */}
        <Dialog open={this.props.isOpenDetailPopup ?? false} onClose={this.handleClose}>
          <DialogContent>
            { this.props.date }
          </DialogContent>
		  일정 상세 팝업
          <DialogActions>
            <Button
              variant="outlined"
              color="primary"
              onClick={this.handleClose}
            >
              닫기
            </Button>
          </DialogActions>
        </Dialog>



      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    contentType: state.counter.contentType,
    date: state.counter.date,
    baseURL: state.counter.baseURL,
	pList: state.counter.pList,
    isOpenDetailPopup: state.counter.isOpenDetailPopup,
    userId: state.counter.userId
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    setSelectedDate: (value) => dispatch(setSelectedDate(value)),
	updatePlist: (value) => dispatch(updatePlist(value)),
	setDetailPopup: (value) => dispatch(setDetailPopup(value))
  };
};

Home = connect(mapStateToProps, mapDispatchToProps)(Home);
export default Home;
