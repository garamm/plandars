<template>
	<div>
		<Header></Header>
		<div class="flex_row">
			<div class="flex_1 wrap_calendar">
				<Calendar />
			</div>
			<div class="wrap_side view_pc">
				<Side />
			</div>
		</div>
	</div>
</template>

<script>
import Header from '../components/Header';
import Calendar from '../components/Calendar';
import Side from '../components/Side';
import EventBus from '../utils/EventBus';
	
export default {
	components: {
		Header, Calendar, Side
	},
	data () {
		return {

		}
	},
	created() {
		this.setToday();
	},
	methods: {		
		setToday: function() {
			var now = new Date();
			let year = now.getFullYear();
			let month = (now.getMonth() + 1);
			let date = now.getDate();
			var selectedDate = new Object();
			selectedDate.year = year;
			selectedDate.month = month;
			selectedDate.date = date;
			
			EventBus.$emit('selectedDate', selectedDate);
		},
	}
}
</script>

<style scoped>

.wrap_side {
  width: 20rem;
  height: calc(100vh - 50px);
  padding: 10px;
  border-left: 1px solid #ECECEC;
}

.wrap_calendar {
  height: calc(100vh - 50px);
  padding: 10px;
}

</style>
