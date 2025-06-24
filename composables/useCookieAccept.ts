import { ref } from 'vue'
import { useCookie } from '#app'

type CookieAccept = 0 | 1

export const useCookieAccept = () => {
    const cookie = useCookie<CookieAccept>('cookieAccept',
        {
            maxAge: 60 * 60 * 24 * 365,
            path: '/',
            sameSite: 'lax'
        })

    const hasAccept = ref<CookieAccept>(cookie.value || 0)

    const acceptCookie = () => {
        hasAccept.value = 1
        cookie.value = 1
    }

    return {
        hasAccept,
        acceptCookie
    }
}
