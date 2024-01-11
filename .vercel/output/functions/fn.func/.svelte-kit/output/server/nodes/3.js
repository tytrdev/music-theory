

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.48j0ml4j.js","_app/immutable/chunks/scheduler.3eNyPLpY.js","_app/immutable/chunks/index.4uVSwjOY.js"];
export const stylesheets = [];
export const fonts = [];
