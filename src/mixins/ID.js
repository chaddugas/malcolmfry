//not being used, but saving file because it might be helpful later
export default {
	computed: {
		id() {
			return (
				'_' +
				Math.random().toString(36).substring(2, 15) +
				Math.random().toString(36).substring(2, 15)
			);
		},
	},
};
