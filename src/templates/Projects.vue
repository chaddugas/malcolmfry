<template lang="pug">
	Layout
		main
			app-project(:project="project")
</template>

<script>
import Project from "@/components/Project"

export default {
	name: "Projects",
  components: {
    appProject: Project
	},
	data() {
		return {
			project: null
		}
	},
	computed: {
    projects() {
    },
	},
	methods: {
	},
	mounted() {
		this.project = this.$page.project
	}
};
</script>

<style lang="scss" scoped>
</style>


<page-query>
query ($id: ID!) {
  project(id: $id) {
		id
		name
		text_hover
		blurb
		image
		image_glitch
		callout_left
  }
}
</page-query>
