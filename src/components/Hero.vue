<template lang="pug">
section.hero(:class="browser.name")
  .inner(@mouseover="hovered = true", @mouseleave="hovered = false")
    .background.tilt
      a.contact(:href="`mailto:${content.email}`", target="_blank") {{ content.email }}
      .image.primary
        img(:src="content.image_glitch")
      .image.secondary
        img(:src="content.image_glitch")
      .image.main
        img(:src="content.image")
      aside.callout(v-show="media && (media[0] !== 'md' && media[0] !== 'sm' && media[0] !== 'xs')")
        span {{ content.callout_left }}
      aside.callout(v-show="media && (media[0] !== 'md' && media[0] !== 'sm' && media[0] !== 'xs')")
        span {{ content.callout_right }}
      nav.projects
        h3.subtitle
          span Case Studies:
        g-link.project(
          tag="span",
          v-for="project in projects",
          @click.self.stop.prevent="",
          :key="project.id",
          :data-content="project.name",
          :to="`/projects/${project.id}`"
        ) {{ project.name }}
    .content
      aside.callout(v-show="media && (media[0] === 'md' || media[0] === 'sm' || media[0] === 'xs')")
        span {{ content.callout_left }}
      aside.callout(v-show="media && (media[0] === 'md' || media[0] === 'sm' || media[0] === 'xs')")
        span {{ content.callout_right }}
      h1.title 
        span {{ content.name }}
</template>

<script>
import "vanilla-tilt";
import Media from "@/mixins/Media";
import { detect } from "detect-browser";

export default {
  name: "Hero",
  mixins: [Media],
  data() {
    return {
      tilter: null,
      hovered: false,
      browser: null,
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
        }, 500);
      } else {
        this.tilter.vanillaTilt.destroy();
      }
    },
  },
  created() {
    if (process.isClient) {
			this.browser = detect()
      // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
      let vh = window.innerHeight * 0.01;
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty("--vh", `${vh}px`);
      window.addEventListener("resize", () => {
        // We execute the same script as before
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
      });
    }
  },
  mounted() {
    if (this.browser.name !== "firefox") {
      const large = this.match.find((media) => media[0] === "lg");
      this.tilter = this.$el.querySelector(".tilt");
      if (large[1].matches) {
        this.tilt();
      }
      large[1].addListener((e) => {
        if (e.matches) {
          this.tilt();
        } else {
          this.tilt(false);
        }
      });
    }
  },
  beforeDestroy() {
    if (this.browser.name !== "firefox") {
      this.tilt(false);
    }
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
  height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1vh) * 100);
  position: relative;
  overflow: hidden;
}

.inner {
  display: flex;
  flex-direction: column;
  width: 90vw;
  position: relative;
  @media (min-width: 950px) {
    height: 75vh;
    width: 75vh;
  }
}

.background {
  position: absolute;
  top: -1rem;
  left: -1rem;
  right: -1rem;
  bottom: -1rem;
  mix-blend-mode: overlay;
  will-change: transform;
  transform: perspective(1000px) scale3d(1, 1, 1);
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
  opacity: 0.5;
  @media (min-width: 950px) {
    opacity: 1;
  }

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
  pointer-events: none;
  margin: 1rem 2rem 0;
  &:not(:first-of-type) {
    margin-top: 0.5rem;
  }
  @media (min-width: 950px) {
    margin: 0;
    &:not(:first-of-type) {
      margin: 0;
    }
    position: absolute;
    white-space: nowrap;
    writing-mode: vertical-rl;
  }
  span {
    @include fluid-type(480px, 1100px, 18px, 20px);
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 0.25rem;
    @media (min-width: 950px) {
      width: 1.5rem;
      line-height: 1;
    }
  }
  @media (min-width: 950px) {
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
      transform: translateX(-50%);
      .safari & {
        transform: translateX(-110px);
      }

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
      transform: translateX(50%);
      .safari & {
        transform: translateX(-20px);
      }

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
}

.content {
  display: flex;
  flex-direction: column;
  flex: 0 0 100%;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 1rem;
  pointer-events: none;
  min-height: 500px;
  @media (min-width: 950px) {
    flex-direction: row;
  }
}

.title {
  position: relative;
  z-index: 0;
  margin: 0;
  @media (min-width: 950px) {
    margin: 0;
    height: 4rem;
    flex: 0 0 100%;
  }
}

.title span {
  display: block;
  padding: 1rem 2rem;
  color: $white;
  font-size: 2rem;
  line-height: 1;
  font-weight: 700;
  text-shadow: -1px -2px 0 rgba(var(--secondary_dark), 0.35),
    2px 1px 0 rgba(var(--primary_dark), 0.35);

  @media (min-width: 950px) {
    position: absolute;
    margin: 0;
    right: 0;
    bottom: 0;
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
  margin: 0;
  padding: 0 0 1rem;
  transition: 0.25s ease;
  display: flex;
  align-items: center;
  background: $white;
  position: absolute;
  left: 1rem;
  top: calc(100% - 1rem);
  right: 1rem;
}

.subtitle {
  @include fluid-type(480px, 1100px, 18px, 24px);
  color: $black;
  padding: 0 1rem;
  font-weight: 700;
  font-size: 1.5rem;
  text-transform: uppercase;
}

.project {
  color: $black;
  padding: 0 0.5rem;
  position: relative;
  z-index: 1;
  font-weight: 700;
  @include fluid-type(480px, 1100px, 18px, 24px);
  text-transform: uppercase;
  cursor: pointer;
  &:hover {
    &::before,
    &::after {
      opacity: 0.5;
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
    padding: 0 0.5rem;
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