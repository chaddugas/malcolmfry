export default {
  data() {
    return {
      media: null,
			isTouchDevice: false,
			match: process.isClient ? [
				["xl", window.matchMedia("(min-width: 1200px)")],
				["lg", window.matchMedia("(min-width: 992px)")],
				["md", window.matchMedia("(min-width: 768px)")],
				["sm", window.matchMedia("(min-width: 576px)")]
			] : []
    };
  },
  methods: {
    checkMedia() {
			this.media = this.match.find(media => media[1].matches)
    }
  },
  created() {
    this.checkMedia();
    try {
      document.createEvent("TouchEvent");
      this.isTouchDevice = true;
    } catch {
      this.isTouchDevice = false;
    }
  },
  mounted() {
		this.match.forEach(media => media[1].addListener(this.checkMedia))
  }
}