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
export default {
	components: {
		Header, Calendar, Side
	},
	data () {
		return {

		}
	}
}
</script>

<style scoped>

.wrap_side {
  width: 20rem;
  height: calc(100vh - 50px);
  padding: 1rem;
  background: #D499B9;
}

.wrap_calendar {
  height: calc(100vh - 50px);
  padding: 1rem;
}

</style>
