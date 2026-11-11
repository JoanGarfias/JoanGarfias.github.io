// Con features.inlineStyles el CSS de la página ya va dentro del HTML; la hoja global
// (cssCodeSplit: false) solo hace falta para navegar a otras páginas en el cliente.
// Se carga sin bloquear el primer render: media="print" y al cargar pasa a "all".
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (html) => {
    html.head = html.head.map(chunk =>
      chunk.replace(
        /<link rel="stylesheet" href="(\/assets\/style\.[^"]+\.css)"([^>]*)>/g,
        '<link rel="stylesheet" href="$1"$2 media="print" onload="this.media=\'all\'"><noscript><link rel="stylesheet" href="$1"></noscript>'
      )
    )
  })
})
