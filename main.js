const isRoot = () => ['', '#/'].includes(location.hash)
const sidebar = () => (isRoot() ? false : 'summary.md')
window.addEventListener('hashchange', () => {
  window.$docsify.loadSidebar = sidebar()
})
window.$docsify = {
  name: '',
  repo: 'thinkasany/docs',
  lastModifiedBranch: 'master',
  loadSidebar: sidebar(),
  lastModifiedText: '最近更新时间：',
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
  alias: {
    '/docs/.*/summary.md': '/docs/summary.md'
  },
  plugins: [
    (hook, vm) => {
      hook.doneEach(() => {
        document
          .getElementById('docsify-darklight-theme')
          .addEventListener('click', () => {
            const theme = localStorage.getItem('DARK_LIGHT_THEME')
            const giscusScript = document.querySelector(
              'script[data-repo="thinkasany/docs"]'
            )
            const newGiscusScript = document.createElement('script')
            for (const attr of giscusScript.attributes) {
              newGiscusScript.setAttribute(attr.name, attr.value)
            }
            newGiscusScript.setAttribute('data-theme', theme)
            giscusScript.parentNode.replaceChild(newGiscusScript, giscusScript)
          })
      })
    }
  ]
}
