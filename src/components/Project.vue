<template lang="pug">
section.project(v-if="project")
	.inner(
		@mouseover="hovered = true",
		@mouseleave="hovered = false",
		@click="opened = !opened",
		:class="{opened}"
	)
		.background
			.image.pink
				img(:src="project.image_glitch")
			.image.blue
				img(:src="project.image_glitch")
			.image.main
				img(:src="project.image")
			aside.callout 
				span {{ project.callout_left }}
		.overview
			p.blurb {{ project.blurb }}
			h1.title
				vue-text-transition(
					tag="span",
					:class="{ hidden: hovered }",
					:name="'fade'",
					:show="!hovered",
					:interval="20",
					:data-content="project.name"
				) {{ project.name }}
				vue-text-transition(
					tag="span",
					:class="{ hidden: !hovered }",
					:name="'fadeDown'",
					:show="hovered",
					:interval="20",
					:data-content="project.text_hover"
				) {{ project.text_hover }}
		.study
			.copy
				p {{ project.content }}
			.preview
				img(src="//via.placeholder.com/600x1800")
		nav.back(:class="{active: hovered}")
			g-link.link(
				tag="span"
				data-content="back"
				:to="`/`") back
</template>


<script>
import Media from "@/mixins/Media";

export default {
	name: "project",
	props: ["project"],
	mixins: [Media],
	data() {
		return {
			hovered: false,
			opened: false,
		};
	},
	computed: {},
	methods: {},
};
</script>


<style lang="scss" scoped>
.project {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
	position: relative;
	overflow: hidden;
}

.inner {
	display: flex;
	flex-direction: column;
	height: 60vmin;
	width: 60vmin;
	position: relative;
	cursor: pointer;
	transition: 0.25s ease;
	&.opened {
		height: 80vmin;
		width: 80vmin;
	}
}

.background {
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	mix-blend-mode: overlay;
	&::before,
	&::after {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		border: 1rem solid $white;
	}
	&::before {
		background-image: linear-gradient(
			to top,
			rgba($black, 1),
			rgba($black, 0.85) 3rem,
			rgba($black, 0.5)
		);
	}
	&::after {
		border-left: none;
		border-right: none;
		z-index: 10;
	}
}

.image {
	position: absolute;
	top: 5.75rem;
	left: 55%;
	bottom: 0;
	height: 55%;
	min-width: 50%;
	overflow: hidden;
	transition: 0.25s ease;
	.opened & {
		opacity: 0;
		pointer-events: none;
	}

	img {
		position: relative;
		height: 100%;
		object-fit: contain;
	}

	&.pink img {
		left: 1rem;
		top: -1.25rem;
		opacity: 0.5;
		filter: #{"contrast(200%)"} opacity(0.35) drop-shadow(0 0 0 $dark_pink) drop-shadow(
				0 0 0 $dark_pink
			) drop-shadow(0 0 0 $dark_pink);
	}

	&.blue img {
		left: -0.5rem;
		top: 0.25rem;
		opacity: 0.5;
		filter: #{"contrast(200%)"} opacity(0.25) drop-shadow(0 0 0 $dark_blue) drop-shadow(
				0 0 0 $dark_blue
			) drop-shadow(0 0 0 $dark_blue);
	}

	&.main img {
		mix-blend-mode: hard-light;
	}
}

.callout {
	position: absolute;
	writing-mode: vertical-rl;
	white-space: nowrap;
	transition: 0.25s ease;
	.opened & {
		opacity: 0;
		pointer-events: none;
	}

	span {
		@include fluid-type(480px, 1100px, 14px, 20px);
		display: flex;
		align-items: center;
		justify-content: center;
		text-transform: uppercase;
		line-height: 1;
		width: 1.5rem;
		font-weight: 700;
		letter-spacing: 0.25rem;
	}
	&::before,
	&::after {
		content: "";
		position: absolute;
		top: 0;
		bottom: 0;
	}

	&::before {
		border: 0.25rem solid $white;
	}

	&::after {
		width: 0.25rem;
		background: linear-gradient(
			to bottom,
			$white 1rem,
			transparent 1rem,
			transparent calc(100% - 1rem),
			$white calc(100% - 1rem)
		);
	}

	&:first-of-type {
		padding: 1.5rem 4rem 1.5rem 0;
		bottom: 15%;
		left: 0;
		transform: translateX(calc(-50%));

		&::before,
		&::after {
			left: 0.6875rem;
		}

		&::before {
			right: 0;
			border-left: none;
		}
	}
}

.overview {
	display: grid;
	height: 100%;
	flex: 0 0 100%;
	grid-template-columns: 55% 1fr;
	grid-template-rows: 1fr 4rem;
	padding: 1rem;
	pointer-events: none;
	transition: 0.25s ease;
	.opened & {
		opacity: 0;
		pointer-events: none;
	}
}

.blurb {
	display: flex;
	justify-content: flex-end;
	align-items: flex-start;
	text-align: right;
	padding: 4.5rem 2rem 0;
	font-size: 1.5rem;
	line-height: 1.25;
	grid-area: 1 / 1 / 2 / 2;
}

.title {
	grid-area: 2 / 1 / 3 / 3;
	align-self: end;
	position: relative;
	z-index: 0;
	margin: 0;
	height: 4rem;
}

.title span {
	position: absolute;
	display: block;
	padding: 1rem 2rem;
	margin: 0;
	right: 0;
	bottom: 0;
	color: $white;
	font-size: 2rem;
	line-height: 1;
	font-weight: 700;
	text-shadow: -1px -2px 0 rgba($dark_blue, 0.35),
		2px 1px 0 rgba($dark_pink, 0.35);
	&.hidden {
		&::before,
		&::after {
			opacity: 0;
		}
	}
	&::before,
	&::after {
		content: attr(data-content);
		position: absolute;
		z-index: -1;
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		mix-blend-mode: hard-light;
		padding: 1rem 2rem;
		transition: opacity 0.25s ease;
	}
	&::before {
		color: $dark_blue;
		top: 2px;
		left: -3px;
		animation: noise-anim-2 15s infinite linear alternate-reverse;
	}
	&::after {
		color: $pink;
		left: 3px;
		top: -2px;
		animation: noise-anim 5s infinite linear alternate-reverse;
	}
}

.study {
	position: absolute;
	top: 1rem;
	left: 1rem;
	right: 1rem;
	bottom: 1rem;
	padding: 2rem 1rem;
	opacity: 0;
	pointer-events: none;
	transition: 0.25s ease;
	overflow-y: auto;
	display: flex;
	.opened & {
		opacity: 1;
		pointer-events: all;
	}
}

.preview {
	margin: 0 1rem;
	flex: 1 1 100%;
	img {
		width: 100%;
		object-fit: cover;
		padding-bottom: 2rem;
	}
}


.back {
	margin: 0 -1rem;
	padding: 1rem 0 2rem;
	opacity: 0;
	pointer-events: none;
	transition: 0.25s ease;
	&.active {
		opacity: 1;
		pointer-events: all;
	}
}

.link {
	color: $white;
	padding: 0 1rem;
	position: relative;
	z-index: 0;
	font-weight: 700;
	font-size: 1.5rem;
	cursor: pointer;
	text-transform: uppercase;
	&:hover {
		&::before,
		&::after {
			opacity: 1;
		}
	}
	&::before,
	&::after {
		content: attr(data-content);
		position: absolute;
		z-index: -1;
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		mix-blend-mode: hard-light;
		padding: 0 1rem;
		transition: opacity 0.25s ease;
		opacity: 0;
	}
	&::before {
		color: darken($dark_blue, 20%);
		top: 2px;
		left: -3px;
		animation: noise-anim-2 15s 1s infinite linear alternate-reverse;
	}
	&::after {
		color: darken($pink, 20%);
		left: 3px;
		top: -2px;
		animation: noise-anim 5s 1s infinite linear alternate-reverse;
	}
}
</style>
