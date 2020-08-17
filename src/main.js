// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import DefaultLayout from '~/layouts/Default.vue'
import VuePageTransition from 'vue-page-transition'
import VueTextTransition from 'vue-text-transition'
import smoothscroll from 'smoothscroll-polyfill'
import '~/assets/scss/1-reset.css'
 

export default function (Vue, { router, head, isClient }) {
	Vue.use(VuePageTransition)
	Vue.component('vue-text-transition', VueTextTransition)
	Vue.component('Layout', DefaultLayout)
	if (process.isClient) {
		smoothscroll.polyfill();
	}
}
