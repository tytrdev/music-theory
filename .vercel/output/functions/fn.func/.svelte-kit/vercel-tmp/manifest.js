export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["android-chrome-192x192.png","android-chrome-512x512.png","apple-touch-icon.png","favicon-16x16.png","favicon-32x32.png","favicon.ico","images/pexels-bg.jpg","site.webmanifest"]),
	mimeTypes: {".png":"image/png",".jpg":"image/jpeg",".webmanifest":"application/manifest+json"},
	_: {
		client: {"start":"_app/immutable/entry/start.2KgocGnf.js","app":"_app/immutable/entry/app.v_h6_LDh.js","imports":["_app/immutable/entry/start.2KgocGnf.js","_app/immutable/chunks/entry.V4JwwCJk.js","_app/immutable/chunks/scheduler.3eNyPLpY.js","_app/immutable/chunks/index.C8kQj3Xr.js","_app/immutable/entry/app.v_h6_LDh.js","_app/immutable/chunks/scheduler.3eNyPLpY.js","_app/immutable/chunks/index.4uVSwjOY.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js')),
			__memo(() => import('../output/server/nodes/3.js')),
			__memo(() => import('../output/server/nodes/4.js')),
			__memo(() => import('../output/server/nodes/5.js')),
			__memo(() => import('../output/server/nodes/6.js')),
			__memo(() => import('../output/server/nodes/7.js')),
			__memo(() => import('../output/server/nodes/8.js')),
			__memo(() => import('../output/server/nodes/9.js')),
			__memo(() => import('../output/server/nodes/10.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/guitar/arpeggios",
				pattern: /^\/guitar\/arpeggios\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/guitar/chord-palette",
				pattern: /^\/guitar\/chord-palette\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/guitar/holdsworth",
				pattern: /^\/guitar\/holdsworth\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/guitar/multiscales",
				pattern: /^\/guitar\/multiscales\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/guitar/scales-by-chord",
				pattern: /^\/guitar\/scales-by-chord\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/guitar/scales",
				pattern: /^\/guitar\/scales\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/guitar/shells",
				pattern: /^\/guitar\/shells\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 10 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
