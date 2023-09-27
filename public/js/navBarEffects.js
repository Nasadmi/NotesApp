// Theme Change

const btnTheme = document.querySelector("#btn_theme")

btnTheme.addEventListener('click', () => {
    if (document.cookie === 'theme=default_theme') {
        document.cookie = 'theme=dark'
    } else {
        document.cookie = 'theme=default_theme'
    }

    window.location.reload()
})