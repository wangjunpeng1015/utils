

export default {
  get(key: string) {
    try {
      const rs = JSON.parse(window.localStorage.getItem(key) || 'null')
      const expired = JSON.parse(window.localStorage.getItem(`${key}_expired`) || 'null')
      if (expired === null || expired > new Date().getTime()) {
        return rs
      }
      return null
    } catch (e) {
      return null;
    }
  },
  set(key: string, value: any, expired: number = 0) {
    window.localStorage.setItem(key, JSON.stringify(value))
    window.localStorage.setItem(`${key}_expired`, JSON.stringify(new Date().getTime() + expired))
  },
  remove(key: string) {
    window.localStorage.removeItem(`${key}`)
  },
  clear() {
    let base = 0
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i)
      if (key) {
        try {
          const expired = parseInt(window.localStorage.getItem(`${key}_expired`) || '-1', 0)
          if (expired >= 0) {
            window.localStorage.removeItem(`${key}`)
            window.localStorage.removeItem(`${key}_expired`)
            base++
          }
        } catch (e) { }
      }
    }
    console.info(`清理了${base}个缓存`)
  },
  clearExpired() {
    let base = 0
    const now = new Date().getTime()
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i)
      if (key) {
        try {
          const expired = parseInt(window.localStorage.getItem(`${key}_expired`) || '-1', 0)
          if (expired >= 0 && expired < now) {
            window.localStorage.removeItem(`${key}`)
            window.localStorage.removeItem(`${key}_expired`)
            base++
          }
        } catch (e) { }
      }
    }
    console.info(`清理了${base}个失效缓存`)
  },
}