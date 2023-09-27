export const theme = (cookie: string | undefined): {
  type: string
  css: string
} => {
  if (cookie === undefined) {
    return {
      type: 'default_theme',
      css: 'root_default.css'
    }
  } else {
    return {
      type: cookie,
      css: cookie === 'dark' ? 'root_dark.css' : 'root_default.css'
    }
  }
}
