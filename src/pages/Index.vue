<template lang="pug">
	Layout
		main
			app-hero
</template>

<script>
import Hero from "@/components/Hero"

export default {
	name: "Home",
  components: {
    appHero: Hero
	},
	methods: {
	}
};
</script>

<style lang="scss" scoped>
</style>
