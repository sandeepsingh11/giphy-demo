$(document).ready(function() {
	Vue.component('header-comp', {
		template: '<h1>Giphy Demo</h1>'
	})

	var header = new Vue({
		el: '#header',
		data: {
			message: 'Giphy Demo'
		}
	})
});
