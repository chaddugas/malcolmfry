<template lang="pug">
section.hero
	.inner(@mouseover="hovered = true", @mouseleave="hovered = false")
		.background.tilt
			a.contact(:href="`mailto:${content.email}`", target="_blank") {{content.email}}
			.image.primary
				img(:src="content.image_glitch")
			.image.secondary
				img(:src="content.image_glitch")
			.image.main
				img(:src="content.image")
			aside.callout 
				span {{ content.callout_left }}
			aside.callout 
				span {{ content.callout_right }}
		.content
			h1.title
				vue-text-transition(
					tag="span",
					:class="{ hidden: hovered }",
					:name="'fade'",
					:show="!hovered",
					:interval="20",
					:data-content="content.name"
				) {{ content.name }}
				vue-text-transition(
					tag="span",
					:class="{ hidden: !hovered }",
					:name="'fadeDown'",
					:show="hovered",
					:interval="20",
					:data-content="content.text_hover"
				) {{ content.text_hover }}
		nav.projects(:class="{ active: hovered }")
			g-link.project(
				tag="span",
				v-for="project in projects",
				@click.self.stop.prevent="",
				:key="project.id",
				:data-content="project.name",
				:to="`/projects/${project.id}`"
			) {{ project.name }}
</template>

<script>
import "vanilla-tilt";
import Media from "@/mixins/Media";

export default {
	name: "Hero",
	mixins: [Media],
	data() {
		return {
			tilter: null,
			hovered: false,
		};
	},
	computed: {
		content() {
			return this.$static.about.edges[0].node;
		},
		projects() {
			return this.$static.projects.edges.reduce((projects, item) => {
				projects.push(item.node);
				return projects;
			}, []);
		},
	},
	methods: {
		tilt(create = true) {
			if (create) {
				setTimeout(() => {
					VanillaTilt.init(this.tilter, {
						max: 3,
						speed: 800,
					});
				}, 500)
			} else {
				this.tilter.vanillaTilt.destroy();
			}
		},
	},
	mounted() {
		this.tilter = this.$el.querySelector(".tilt");
		this.tilt();
	},
	beforeDestroy() {
		this.tilt(false);
	},
};
</script>


<style lang="scss" scoped>
.hero {
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
}

.background {
	position: absolute;
	top: -1rem;
	left: -1rem;
	right: -1rem;
	bottom: -1rem;
	mix-blend-mode: overlay;
	&::before,
	&::after {
		content: "";
		position: absolute;
		top: 1rem;
		left: 1rem;
		right: 1rem;
		bottom: 1rem;
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

.contact {
	position: absolute;
	right: 1rem;
	font-weight: 700;
	color: $white;
	bottom: calc(100% - 1rem);
	font-size: 1.125rem;
	background: $white;
	padding: 0.875rem 1.5rem;
	color: $black;
	transition: 0.25s ease;
	&:hover {
		background: $black;
		color: $white;
	}
}

.image {
	position: absolute;
	top: 1rem;
	left: 1rem;
	bottom: 1rem;
	height: calc(100% - 2rem);
	min-width: 100%;
	overflow: hidden;

	img {
		position: relative;
		height: 100%;
		object-fit: contain;
	}

	&.primary img {
		left: 1rem;
		top: -1.25rem;
		opacity: 0.5;
		filter: #{"contrast(200%)"} opacity(0.35) drop-shadow(
				0 0 0 var(--primary_dark)
			) drop-shadow(0 0 0 var(--primary_dark)) drop-shadow(0 0 0
					var(--primary_dark));
	}

	&.blue img {
		left: -0.5rem;
		top: 0.25rem;
		opacity: 0.5;
		filter: #{"contrast(200%)"} opacity(0.25) drop-shadow(
				0 0 0 var(--secondary_dark)
			) drop-shadow(0 0 0 var(--secondary_dark)) drop-shadow(0 0 0
					var(--secondary_dark));
	}

	&.main img {
		mix-blend-mode: hard-light;
	}
}

.callout {
	position: absolute;
	writing-mode: vertical-rl;
	white-space: nowrap;
	pointer-events: none;
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
		top: 15%;
		left: 1rem;
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

	&:last-of-type {
		padding: 1.5rem 0 1.5rem 4rem;
		bottom: 15%;
		right: 1rem;
		transform: translateX(calc(50%));

		&::before,
		&::after {
			right: 0.6875rem;
		}

		&::before {
			left: 0;
			border-right: none;
		}
	}
}

.content {
	display: flex;
	flex: 0 0 100%;
	justify-content: flex-end;
	align-items: flex-end;
	padding: 1rem;
	pointer-events: none;
}

.title {
	flex: 0 0 100%;
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
	text-shadow: -1px -2px 0 rgba(var(--secondary_dark), 0.35),
		2px 1px 0 rgba(var(--primary_dark), 0.35);
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
		color: var(--secondary_dark);
		top: 2px;
		left: -3px;
		animation: noise-anim-2 15s infinite linear alternate-reverse;
	}
	&::after {
		color: var(--primary);
		left: 3px;
		top: -2px;
		animation: noise-anim 5s infinite linear alternate-reverse;
	}
}

.projects {
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

.project {
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
		color: var(--secondary_dark);
		top: 2px;
		left: -3px;
		animation: noise-anim-2 15s 1s infinite linear alternate-reverse;
	}
	&::after {
		color: var(--primary);
		left: 3px;
		top: -2px;
		animation: noise-anim 5s 1s infinite linear alternate-reverse;
	}
}
</style>



<static-query>
query {
	about: allAbout {
		edges {
			node {
				name
				email
				text_hover
				image
				image_glitch
				callout_left
				callout_right
			}
		}
	}
	projects:allProject {
		edges {
			node {
				id
				name
			}
		}
	}
}
</static-query>