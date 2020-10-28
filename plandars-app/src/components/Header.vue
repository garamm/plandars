<template>
	<div>
		<div class="background flex_row">
			<span class="view_pc_tab flex_1"><i class="fas fa-moon" style="margin-right: 0.8rem; color: yellow"></i>Plandars</span>

			<span class="view_m flex_1">
				<span class="pointer"><i class="fas fa-chevron-left"></i></span>
				&nbsp;&nbsp;
				<span class="pointer">{{ thisMonth }}</span>
				&nbsp;&nbsp;
				<span class="pointer"><i class="fas fa-chevron-right"></i></span>
			</span>

			<div class="view_pc_tab">
				<a class="pointer">WEEK</a>&nbsp;/&nbsp;<a class="pointer">MONTH</a>
			</div>

			<div class="view_m bold">
				<a class="pointer">W</a>
			</div>

			<span class="header_margin pointer"><i class="fas fa-cog"></i></span>
			<span class="header_margin pointer"><i class="fas fa-sign-out-alt"></i></span>

		</div>
	</div>
</template>

<script>
	
export default {
	components: {
		
	},
	data () {
		return {
			thisMonth: "",
		}
	},
	created() {
		var date = new Date(); 
        var year = date.getFullYear(); 
        var month = new String(date.getMonth()+1);
		
        this.thisMonth = year+"년 "+month+"월";
	}
}
</script>

<style scoped>
.background {
    color: white;
    background: #9055A2;
	height: 60px;
    font-size: 20px;
	padding-top: 16px;
	padding-left: 16px;
	padding-right: 16px;
}

.header_margin {
    margin-left: 16px;
}

.pointer {
    cursor: pointer;
}

.bold {
	font-weight: bold;
}
</style>
