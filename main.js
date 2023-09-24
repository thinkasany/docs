const isRoot = () => ["", "#/"].includes(location.hash);
const sidebar = () => (isRoot() ? false : "summary.md");
window.addEventListener("hashchange", () => {
  window.$docsify.loadSidebar = sidebar();
});
window.$docsify = {
  name: "",
  repo: "",
  loadSidebar: sidebar(),
  search: {
    depth: 2,
    hideOtherSidebarContent: true,
    pathNamespaces: ["/", "/docs"]
  },
  alias: {
    "/docs/.*/summary.md": "/docs/summary.md"
  }
};
