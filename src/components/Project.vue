<template lang="pug">
section.project(v-if="project", :class="browser.name")
  .inner(
    @mouseover="hovered = true",
    @mouseleave="hovered = false",
    @click="opened = !opened",
    :class="{ opened }"
  )
    .background.tilt
      .image.primary
        img(:src="project.image_glitch")
      .image.secondary
        img(:src="project.image_glitch")
      .image.main
        img(:src="project.image")
      aside.callout(
        v-if="media && media[0] !== 'md' && media[0] !== 'sm' && media[0] !== 'xs'"
      )
        span {{ project.callout_left }}
    .overview
      p.blurb {{ project.blurb }}
      h1.title
        vue-text-transition(
          tag="span",
          :class="{ hidden: hovered }",
          :name="'fade'",
          :show="!hovered || (media && (media[0] === 'md' || media[0] === 'sm' || media[0] === 'xs'))",
          :interval="20",
          :data-content="project.name"
        ) {{ project.name }}
        vue-text-transition(
          tag="span",
          :class="{ hidden: !hovered }",
          :name="'fadeDown'",
          :show="hovered || (media && (media[0] === 'md' || media[0] === 'sm' || media[0] === 'xs'))",
          :interval="20",
          :data-content="project.text_hover"
        ) {{ project.text_hover }}
    .study
      button.close &times;
      .preview
        img(:src="project.study")
    nav.back(:class="{ active: !opened }", @click.stop="")
      g-link.link(tag="span", data-content="back", :to="`/`") back
</template>


<script>
import Media from "@/mixins/Media";
import "vanilla-tilt";
import { detect } from "detect-browser";

export default {
  name: "project",
  props: ["project"],
  mixins: [Media],
  data() {
    return {
      tilter: null,
      hovered: false,
      opened: false,
      browser: detect(),
    };
  },
  computed: {},
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
  watch: {
    opened() {
      if (this.browser.name !== "firefox") {
        const large = this.match.find((media) => media[0] === "lg");
        if (this.opened) {
          this.tilt(false);
        } else if (large[1].matches) {
          this.tilt();
        }
      }
    },
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
.project {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
	min-height: -webkit-fill-available; 
  position: relative;
  overflow: hidden;
}

.inner {
  display: flex;
  flex-direction: column;
  width: 90vw;
  height: 90vw;
  position: relative;
  cursor: pointer;
  transition: 0.25s ease;
  &.opened {
    height: 95vw;
    width: 95vw;
  }
  @media (min-width: 950px) {
    height: 75vh;
    width: 75vh;
    &.opened {
      height: 85vh;
      width: 85vh;
    }
  }
}

.background {
  position: absolute;
  top: 1rem;
  right: 1rem;
  left: 1rem;
  bottom: 1rem;
  mix-blend-mode: overlay;
  will-change: transform;
  transform: perspective(1000px) scale3d(1, 1, 1);
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: -1rem;
    left: -1rem;
    right: -1rem;
    bottom: -1rem;
    border: 1rem solid $white;
    pointer-events: none;
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
  // overflow: hidden;
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

  &.primary img {
    left: 1rem;
    top: -1.25rem;
    opacity: 0.5;
    filter: #{"contrast(200%)"} opacity(0.35) drop-shadow(
        0 0 0 var(--primary_dark)
      ) drop-shadow(0 0 0 var(--primary_dark)) drop-shadow(0 0 0
          var(--primary_dark));
  }

  &.secondary img {
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
  transition: 0.25s ease;
  .opened & {
    opacity: 0;
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
    left: -1rem;
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
}

.overview {
  display: grid;
  height: 100%;
  flex: 0 0 100%;
  grid-template-columns: 55% 1fr;
  grid-template-rows: 1fr auto;
  padding: 1rem;
  pointer-events: none;
  transition: 0.25s ease;
  @media (min-width: 950px) {
    grid-template-rows: 1fr 4rem;
  }
  .opened & {
    opacity: 0;
    pointer-events: none;
  }
}

.blurb {
  @include fluid-type(480px, 1100px, 18px, 24px);
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  text-align: right;
  padding: 4.5rem 2rem 0;
  line-height: 1.25;
  grid-area: 1 / 1 / 2 / 2;
}

.title {
  grid-area: 2 / 1 / 3 / 3;
  align-self: end;
  position: relative;
  z-index: 0;
  margin: 0;
  @media (min-width: 950px) {
    height: 4rem;
  }
}

.title span {
  @include fluid-type(480px, 1100px, 24px, 32px);
  display: block;
  margin: 1rem;
  color: $white;
  line-height: 1;
  font-weight: 700;
  text-shadow: -1px -2px 0 rgba(var(--secondary_dark), 0.35),
    2px 1px 0 rgba(var(--primary_dark), 0.35);

  @media (min-width: 950px) {
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 1rem 2rem;
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
}

.study {
  position: absolute;
  top: 2rem;
  left: 2rem;
  right: 2rem;
  bottom: 2rem;
  padding: 0;
  opacity: 0;
  pointer-events: none;
  transition: 0.25s ease;
  .opened & {
    opacity: 1;
    pointer-events: all;
  }
}

.close {
  border: none;
  background: none;
  position: absolute;
  z-index: 2;
  top: 1rem;
  right: 1rem;
  padding: 0;
  margin: 0;
  appearance: none;
  color: $white;
  font-size: 2.5rem;
  line-height: 2.5rem;
  overflow-y: auto;
  cursor: pointer;
  outline: none;
  text-shadow: 0.0625rem 0.0625rem 0.25rem rgba($black, 0.75);
}

.preview {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  flex: 1 1 100%;
  height: 100%;
  width: 100%;
  overflow: auto;
  img {
    width: 100%;
    min-width: 800px;
    align-self: flex-start;
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
