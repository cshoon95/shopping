/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['picsum.photos', 'source.unsplash.com']
	},
	compiler: {
		emotion: true
	},
	swcMinify: true,

	webpack: (config, { isServer }) => {
		if (!isServer) {

		config.resolve.fallback = {
			fs: false,
		};
		}

		return config;
	},
}

module.exports = nextConfig

