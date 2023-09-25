const isRoot = () => ['', '#/'].includes(location.hash);
const sidebar = () => (isRoot() ? false : 'summary.md');
window.addEventListener('hashchange', () => {
  window.$docsify.loadSidebar = sidebar();
});
window.$docsify = {
  name: '',
  repo: 'thinkasany/docs',
  lastModifiedBranch: 'master',
  loadSidebar: sidebar(),
  lastModifiedText: '最近更新时间：',
  logo: '/images/logo.png',
  copyCode: {
    buttonText: 'Copy to clipboard',
    errorText: 'Error',
    successText: 'Copied',
  },
  search: {
    depth: 2,
    hideOtherSidebarContent: true,
    pathNamespaces: ['/', '/docs']
  },
  darklightTheme: {
    defaultTheme: 'light',
    siteFont: 'Source Sans Pro,Helvetica Neue,Arial,sans-serif',
    codeFontFamily: 'Roboto Mono, Monaco, courier, monospace',
    bodyFontSize: '15px',
    dark: {
      background: '#191919',
      highlightColor: '#e96900',
      codeBackgroundColor: '#202020',
      codeTextColor: '#b4b4b4'
    },
    light: {
      highlightColor: '#e96900'
    }
  },
  pagination: {
    previousText: 'PREVIOUS',
    nextText: 'NEXT',
    crossChapter: true,
    crossChapterText: true
  },
  alias: {
    '/docs/.*/summary.md': '/docs/summary.md'
  },
  plugins: [
    (hook, vm) => {
      hook.beforeEach(html => {
        const { file } = vm.route;
        const url = `https://github.com/thinkasany/docs/blob/master/${file}`;
        const github = `在 [github](${url}) 编辑\n\n`;
        return github + html;
      });
      hook.doneEach(() => {
        document.getElementById('docsify-darklight-theme').addEventListener('click', () => {
          const theme = localStorage.getItem('DARK_LIGHT_THEME') === 'light' ? 'light' : 'noborder_dark';
          const frame = document.querySelector('.giscus-frame');
          frame.contentWindow.postMessage({ giscus: { setConfig: { theme } } }, 'https://giscus.app');
        });
      });
    }
  ]
};
