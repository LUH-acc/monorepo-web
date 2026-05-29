type AnyFn = (...args: never[]) => unknown

type DebouncedFn<T extends AnyFn> = ((...args: Parameters<T>) => void) & {
    /** 取消防抖，清除待执行的调用 */
    cancel: () => void
}

type ThrottledFn<T extends AnyFn> = ((...args: Parameters<T>) => void) & {
    /** 取消节流锁定 */
    cancel: () => void
}

/**
 * 防抖：连续触发时只在 stop 后 wait ms 执行最后一次
 */
export function debounce<T extends AnyFn>(fn: T, wait: number): DebouncedFn<T> {
    let timer: ReturnType<typeof setTimeout> | undefined

    const debounced = ((...args: Parameters<T>) => {
        if (timer !== undefined)
            clearTimeout(timer)

        timer = setTimeout(() => {
            timer = undefined
            fn(...args)
        }, wait)
    }) as DebouncedFn<T>

    debounced.cancel = () => {
        if (timer !== undefined) {
            clearTimeout(timer)
            timer = undefined
        }
    }

    return debounced
}

/**
 * 节流：wait ms 内最多执行一次（首次立即执行）
 */
export function throttle<T extends AnyFn>(fn: T, wait: number): ThrottledFn<T> {
    let locked = false
    let timer: ReturnType<typeof setTimeout> | undefined

    const throttled = ((...args: Parameters<T>) => {
        if (locked)
            return

        locked = true
        fn(...args)

        timer = setTimeout(() => {
            locked = false
            timer = undefined
        }, wait)
    }) as ThrottledFn<T>

    throttled.cancel = () => {
        if (timer !== undefined) {
            clearTimeout(timer)
            timer = undefined
        }
        locked = false
    }

    return throttled
}
