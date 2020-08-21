<template lang="pug">
	Layout(v-if="project", :style="`--primary: ${project.primary}; --primary_dark: ${project.primary_dark}; --secondary: ${project.secondary}; --secondary_dark: ${project.secondary_dark}`")
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
	computed: {},
	methods: {},
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
		study
		primary
		primary_dark
		secondary
		secondary_dark
  }
}
</page-query>
