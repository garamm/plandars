<template>
	<div style="height: 100%;" class="flex_col">
		<p class="view_pc_tab" style="font-weight: bold; font-size: 20px;">
			<span class="pointer"><i class="fas fa-chevron-left"></i></span>
			&nbsp;&nbsp;
			{{ $store.state.year }}년 {{ $store.state.month }}월
			&nbsp;&nbsp;
			<span class="pointer"><i class="fas fa-chevron-right"></i></span>
		</p>
		<div style="margin-top: 8px;">
			<div class="cell cell_header" v-for="(item) in yoilList" v-bind:key="item">
				{{ item }}
			</div>
		</div>
		
		<div class="flex_1">
			<div class="cell cell_content" v-for="(item, idx) in dateList" v-bind:key="idx">
				{{ item.date }}
			</div>
		</div>
		
	</div>
</template>

<script>
	
export default {
	components: {
	},
	data () {
		return {
			yoilList: ["일", "월", "화", "수", "목", "금", "토"],
			dateList: [],
		}
	},
	created() {
		this.drawCalendar();
	},
	methods: {
		drawCalendar: function() {
			this.dateList = [];
			var firstDate = new Date(this.$store.state.year, (this.$store.state.month - 1), 1); // 이번달 시작일
			var prevLastDate = new Date(this.$store.state.year, (this.$store.state.month - 1), 0); // 전달의 마지막 일
			
			var firstDate = new Date(this.$store.state.year, this.$store.state.month - 1, 1);
			let lastDate = new Date(this.$store.state.year, this.$store.state.month, 0);

			// 당월 첫날의 요일 구하기 (일요일부터 시작)
			let firstDayOfWeek = firstDate.getDay();
			let prevDate = new Date(new Date(this.$store.state.year, this.$store.state.month - 1, 1).setDate(new Date(this.$store.state.year, this.$store.state.month - 1, 1).getDate() - 1));
			let prevYear = new Date(new Date(this.$store.state.year, this.$store.state.month - 1, 1).setDate(new Date(this.$store.state.year, this.$store.state.month - 1, 1).getDate() - 1)).getFullYear();
			let prevMonth = new Date(new Date(this.$store.state.year, this.$store.state.month- 1, 1).setDate(new Date(this.$store.state.year, this.$store.state.month - 1, 1).getDate() - 1)).getMonth() + 1;


			// 전월 데이터 채우기
			if (firstDayOfWeek != 0) { // 당월 1일이 일요일이 아니면 앞에 전월 데이터를 추가해야하기 때문
				for (var i = 0; i < firstDayOfWeek; i++) {
					this.dateList.unshift({
						year: prevYear,
						month: this.makeDigitStr(prevMonth),
						date: prevDate.getDate() - i,
						type: "prev",
						holiday: ""
					});
				}
			}
			
			// 당월 데이터 채우기
			for (var i = 1; i <= lastDate.getDate(); i++) {
				this.dateList.push({
					year: this.$store.state.year,
					month: this.makeDigitStr(this.$store.state.month),
					date: this.makeDigitStr(i),
					type: "now",
					holiday: ""
				});
			}
			
			// 당월 마지막날의 요일 구하기 (일요일부터 시작)
			let lastDayOfWeek = lastDate.getDay();
			let nextDate = new Date(new Date(this.$store.state.year, this.$store.state.month, 0).setDate(new Date(this.$store.state.year, this.$store.state.month, 0).getDate() + 1)).getDate();
			let nextYear = new Date(new Date(this.$store.state.year, this.$store.state.month, 0).setDate(new Date(this.$store.state.year, this.$store.state.month, 0).getDate() + 1)).getFullYear();
			let nextMonth = new Date(new Date(this.$store.state.year, this.$store.state.month, 0).setDate(new Date(this.$store.state.year, this.$store.state.month, 0).getDate() + 1)).getMonth() + 1;

			// 다음월 데이터 채우기
			if (lastDayOfWeek != 6) { // 당월 마지막날짜가 토요일이 아니면 나머지 공간을 채워줘야하기 때문
				for (var i = 0; i < 6 - lastDayOfWeek; i++) {
					this.dateList.push({
						year: nextYear,
						month: this.makeDigitStr(nextMonth),
						date: "0" + (i + 1),
						type: "next",
						holiday: ""
					});
				}
			}
		},
		makeDigitStr: function(num) {
			if(num < 10) {
				return "0"+num;
			} else {
				return num;
			}
		},
		test: function() {
			let testobj = new Object();
			testobj.year = "2020";
			testobj.month = "08";
			testobj.date = "12";
			this.$store.commit('setDate', testobj);
			
			this.drawCalendar();
		}
	}
}
</script>

<style scoped>
	
	.cell_header {		
		border-bottom: 1px solid #ECECEC;
	}
	
	.cell {
		padding: 3px;
		display: inline-block;
		width: calc(100% / 7);
		border-bottom: 1px solid #ECECEC;
	}
	
	
	.cell_content {
		height: calc(100% / 5);
	}
	
</style>
