import { c as create_ssr_component } from "../../chunks/ssr.js";
import "../../chunks/stores.js";
/* empty css               */
import "theme-change";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="flex flex-col items-center text-xl h-screen">${slots.default ? slots.default({}) : ``}</div>`;
});
export {
  Layout as default
};
