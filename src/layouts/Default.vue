<template lang="pug">
	.page
		.noise
		.gradient
		.grid
		slot
</template>

<static-query>
</static-query>

<script>
export default {
	name: "Layout"
}
</script>

<style lang="scss" scoped>
.page {
	overflow: hidden;
}

.noise,
.gradient,
.grid {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.noise {
	opacity: 0.075;
  background-size: 55px 10px;
  background-repeat: repeat;
  background-image: -webkit-repeating-radial-gradient(
      1% 21%,
      closest-corner,
      rgba(255, 0, 255, 0.5),
      rgba(0, 255, 255, 0.5),
      rgba(0, 0, 0, 1) 1.7%
    ),
    -webkit-repeating-radial-gradient(51% 51%, closest-corner, rgba(255, 255, 255, 1), rgba(255, 255, 255, 1), rgba(
            0,
            255,
            0,
            1
          )
          10%);

  &::before {
    content: "";
    position: absolute;
    mix-blend-mode: exclusion;
    background-size: 12px 22px;
    background-repeat: repeat;
    background-image: -webkit-repeating-radial-gradient(
        61% 21%,
        closest-corner,
        rgba(255, 255, 255, 1),
        rgba(0, 255, 0, 0.5),
        rgba(3, 0, 255, 1) 20%
      ),
      -webkit-repeating-radial-gradient(91% 51%, closest-corner, rgba(255, 255, 255, 1), rgba(255, 255, 1, 0.5), rgba(
              055,
              255,
              255,
              1
            )
            20%);
    left: 0;
    z-index: 998;
  }
  &::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    mix-blend-mode: exclusion;
    background-size: 15px 13px;
    background-repeat: repeat;
    background-image: -webkit-repeating-radial-gradient(
      21% 21%,
      closest-corner,
      rgba(255, 255, 255, 1),
      rgba(0, 0, 255, 0.5),
      rgba(3, 0, 255, 1) 20%
    );
    left: 0;
    top: 0;
    z-index: 999;
  }
}

.gradient {
	mix-blend-mode: overlay;
	background: linear-gradient(to top left, var(--primary_dark), var(--primary), var(--secondary), var(--secondary_dark));
}

.grid {
  &::before {
    content: "";
    position: absolute;
    top: 8vmin;
    left: 10vmin;
    right: 10vmin;
    bottom: 8vmin;
    background-position: 50% 50%;
    opacity: 0.25;
    mix-blend-mode: overlay;
    background-size: 30px 30px;
    background-image: linear-gradient(
        to left,
        $white,
        $white 1px,
        transparent 0,
        transparent 30px
      ),
      linear-gradient(
        to bottom,
        $white,
        $white 1px,
        transparent 0,
        transparent 30px
      );
  }
}
</style>
