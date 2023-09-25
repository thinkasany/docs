const isRoot = () => ["", "#/"].includes(location.hash);
const sidebar = () => (isRoot() ? false : "summary.md");
window.addEventListener("hashchange", () => {
  window.$docsify.loadSidebar = sidebar();
});
window.$docsify = {
  name: "",
  repo: "thinkasany/docs",
  lastModifiedBranch: 'master',
  loadSidebar: sidebar(),
  lastModifiedText: '最近更新时间：',
  search: {
    depth: 2,
    hideOtherSidebarContent: true,
    pathNamespaces: ["/", "/docs"]
  },
  alias: {
    "/docs/.*/summary.md": "/docs/summary.md"
  }
};
