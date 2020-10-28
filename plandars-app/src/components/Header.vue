<template>
	<div>
		<div class="header flex_row">
			<span class="view_pc_tab flex_1"><i class="fas fa-moon" style="margin-right: 0.8rem; color: yellow"></i>Plandars</span>

			<span class="view_m flex_1">
				<span class="pointer"><i class="fas fa-chevron-left"></i></span>
				&nbsp;&nbsp;
				<span class="pointer">{{ $store.state.year }}년 {{ $store.state.month }}월</span>
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
		}
	},
	created() {
	}
}
</script>

<style scoped>
.header {
    color: white;
    background: #9055A2;
    font-size: 20px;
	padding: 10px;
}

.header_margin {
    margin-left: 10px;
}


</style>
