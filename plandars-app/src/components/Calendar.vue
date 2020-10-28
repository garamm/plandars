<template>
	<div>
		Calendar<br>
		{{ this.year }} - {{ this.month }} - {{ this.date }}
	</div>
</template>

<script>
import EventBus from '../utils/EventBus';
	
export default {
	components: {
		
	},
	data () {
		return {
			year: "",
			month: "",
			date: "",
		}
	},
	created() {
		EventBus.$on('selectedDate', (payload)=>{
            this.year = payload.year;
			this.month = payload.month;
			this.date = payload.date;
        });
		
		this.drawCalendar();
	},
	methods: {
		drawCalendar: function() {
			
		}
	}
}
</script>

<style scoped>
</style>
