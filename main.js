const isRoot = () => ['', '#/'].includes(location.hash);
const isDev = () => location.host.includes('localhost');
const sidebar = () => {
  if (isRoot()) {
    return false;
  }
  if (location.hash.includes('mytools')) {
    return 'tools_summary.md';
  }
  return 'summary.md';
};
window.addEventListener('hashchange', () => {
  window.$docsify.loadSidebar = sidebar();
});
window.$docsify = {
  name: 'docs',
  repo: 'thinkasany/docs',
  subMaxLevel: 2,
  lastModifiedBranch: 'master',
  loadSidebar: sidebar(),
  lastModifiedText: '最近更新时间：',
  logo: '/images/logo.png',
  copyCode: {
    buttonText: 'Copy to clipboard',
    errorText: 'Error',
    successText: 'Copied'
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
        const replacedContent = html.replace(
          /<img\s+src="/g,
          '<img src="https://fastly.jsdelivr.net/gh/thinkasany/docs@master'
        );
        // https://raw.githubusercontent.com
        const url = `https://github.com/thinkasany/docs/blob/master/${file}`;
        const github = `在 [github](${url}) 编辑\n\n`;
        // console.log(replacedContent);
        return github + `${isDev() ? html : replacedContent}`;
      });
      hook.doneEach(() => {
        const theme = localStorage.getItem('DARK_LIGHT_THEME') === 'light' ? 'light' : 'noborder_dark';
        let path = vm.route.path === '/' ? '/index' : vm.route.path;

        path = decodeURI(path);

        const dsq = document.createElement('script');
        dsq.type = 'text/javascript';
        dsq.async = true;
        dsq.setAttribute('src', 'https://giscus.app/client.js');
        dsq.setAttribute('data-repo', 'thinkasany/docs');
        dsq.setAttribute('data-repo-id', 'R_kgDOKXpjaA');
        dsq.setAttribute('data-category', 'Announcements');
        dsq.setAttribute('data-category-id', 'DIC_kwDOKXpjaM4CZl8-');
        dsq.setAttribute('data-mapping', 'specific');
        dsq.setAttribute('data-term', path);
        dsq.setAttribute('data-reactions-enabled', '1');
        dsq.setAttribute('data-emit-metadata', '0');
        dsq.setAttribute('data-input-position', 'bottom');
        dsq.setAttribute('data-theme', theme);
        dsq.setAttribute('data-lang', 'zh-CN');
        dsq.setAttribute('data-loading', 'lazy');
        dsq.setAttribute('crossorigin', 'anonymous');

        document.getElementById('main').insertBefore(dsq, document.getElementById('main').lastChild);
        document.getElementById('docsify-darklight-theme').addEventListener('click', () => {
          const frame = document.querySelector('.giscus-frame');
          frame.contentWindow.postMessage({ giscus: { setConfig: { theme } } }, 'https://giscus.app');
          return;
        });
      });
    }
  ]
};
