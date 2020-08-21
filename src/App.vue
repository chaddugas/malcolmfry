<template lang="pug">
	transition-group(name="fade", tag="main")
		router-view.fade-item(:key="'router'")
</template>

<script>
export default {
  name: "Portfolio",
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=#{str-replace($headings, ' ', '+')}:400,700|#{str-replace($body, ' ', '+')}:300,700&display=swap");
html {
  font-size: 16px;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
}
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  font-family: $body, sans-serif;
  font-weight: $b_weight;
  font-size: $b_size;
  color: $white;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: $headings, monospace;
  font-weight: $h_weight;
}

.fade-item {
	position: relative;
	top: 0;
	left: 0;
	transition: all 0.75s;
	will-change: transform, opacity;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
	transform: scale(1.25, 1.25);
	transform-origin: 50% 50%;
}
.fade-leave-active {
  position: absolute;
}

@keyframes noise-anim {
  $steps: 40;
  @for $i from 0 through $steps {
    $top: random(100);
    $bottom: random(101 - $top);
    @if $i < 20 {
      #{percentage($i*(1/($steps)))} {
        clip-path: inset(#{$top}% 0 #{$bottom}% 0);
      }
    } @else {
      #{percentage($i*(1/($steps)))} {
        clip-path: inset(50% 0 0 0);
      }
    }
  }
}
@keyframes noise-anim-2 {
  $steps: 100;
  @for $i from 0 through $steps {
    $top: random(100);
    $bottom: random(101 - $top);
    @if $i < 50 {
      #{percentage($i*(1/($steps)))} {
        clip-path: inset(#{$top}% 0 #{$bottom}% 0);
      }
    } @else {
      #{percentage($i*(1/($steps)))} {
        clip-path: inset(20% 0 30% 0);
      }
    }
  }
}

.v--vtt-fade,
.v--vtt-fadeDown {
  will-change: transform, opacity;
  transition: opacity 0.2s ease-in-out, transform 0.4s ease-in-out;
}

.v--vtt-fade_visible,
.v--vtt-fadeDown_visible {
  opacity: 1;
  transform: translateY(0);
}

.v--vtt-fade_hidden {
  opacity: 0;
  transform: translateY(20px);
}

.v--vtt-fadeDown_hidden {
  opacity: 0;
  transform: translateY(-20px);
}
</style>