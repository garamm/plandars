<template>
	<div class="wrap_main flex_col">
		<Header></Header>
		<div class="flex_row flex_1">
			<div class="flex_1 view_pc_tab" style="margin: 16px !important;">
				<Calendar />
			</div>
			<div class="flex_1 view_m" style="margin: 0px !important;">
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
	},	
	methods: {		
		setToday: function() {
			var now = new Date();
			this.$store.state.year = now.getFullYear();
			this.$store.state.month = this.makeDigitStr(now.getMonth() + 1);
			this.$store.state.date = this.makeDigitStr(now.getDate());
		},
		makeDigitStr: function(num) {
			if(num < 10) {
				return "0"+num;
			} else {
				return num;
			}
		}
	},
	created() {
		this.setToday();
	},
}
</script>

<style scoped>

	.wrap_main {
		width: 100%;
		height: 100%;
	}
	
	.wrap_side {
		width: 20rem;
		height: 100%;
		padding: 10px;
		border-left: 1px solid #ECECEC;
	}

</style>
