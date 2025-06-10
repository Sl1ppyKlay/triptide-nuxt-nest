import { ref } from 'vue'
import { useCookie, useRequestEvent } from '#app'

type Theme = 'light' | 'dark'

export const useTheme = () => {
    const theme = ref<Theme>('light')

    const applyTheme = (themeValue: Theme) => {
        if (process.client) {
            document.documentElement.setAttribute('data-theme', themeValue)
        }
    }

    if (process.server) {
        const event = useRequestEvent()
        if (event) {
            const cookieTheme = event.node.req.headers.cookie?.match(/theme=([^;]+)/)?.[1]
            if (cookieTheme === 'dark' || cookieTheme === 'light') {
                theme.value = cookieTheme as Theme
            }
        }
    } else {
        const cookieTheme = useCookie<Theme>('theme')
        if (cookieTheme.value === 'dark' || cookieTheme.value === 'light') {
            theme.value = cookieTheme.value
            applyTheme(cookieTheme.value)
        } else {
            applyTheme(theme.value)
        }
    }

    const cookie = process.client ? useCookie<Theme>('theme', {
        maxAge: 60 * 60 * 24 * 365,
        path: '/',
    }) : null

    const toggleTheme = () => {
        theme.value = theme.value === 'dark' ? 'light' : 'dark'
        if (process.client && cookie) {
            cookie.value = theme.value
            applyTheme(theme.value)
        }
    }

    return {
        theme,
        toggleTheme
    }
}