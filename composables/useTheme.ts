import { ref } from 'vue'
import { useCookie, useRequestEvent } from '#app'

type Theme = 'light' | 'dark';

export function useTheme = () => {
    const theme = ref<Theme>('dark');

    const applyTheme = (themeValue: Theme) => {
        if (process.client) {
            document.documentElement.setAttribute('data-theme', themeValue);
        }
    }

    if (process.server) {
       const event = useRequestEvent();
       const cookieTheme = event.node.req.headers.cookie?.match(/theme=([^;]+)/)?.[1];
       if (cookieTheme) {
           theme.value = <Theme>cookieTheme;
       }
    } else {
        const cookieTheme = useCookie('theme');
        if (cookieTheme.value) {
            theme.value = <Theme>cookieTheme.value
            applyTheme(cookieTheme.value)
        } else {
            applyTheme(theme.value)
        }
    }

    const toggleTheme = () => {
        theme.value = theme.value === 'dark' ? 'light' : 'dark'
        if (process.client) {
            const cookie = useCookie('theme', {
                maxAge: 60 * 60 * 24 * 365,
                path: '/',
            })
            cookie.value = theme.value
            applyTheme(theme.value)
        }
    }

    return {
        theme,
        toggleTheme
    }
}