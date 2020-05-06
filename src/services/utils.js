function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const defaultTimeout = 500

export const ensureTimeout = async(method, timeout = defaultTimeout, ...args) => {
  const methodWithContext = Array.isArray(method)
  const methodWithoutContext = typeof method === 'function'
  const t0 = performance.now()
  let result

  if (methodWithoutContext) {
    result = await method(...args)
  } else if (methodWithContext) {
    const sendErrorMsg = 'Send is not valid for the context. A String or Array of strings is required'
    const context = method[0]
    let func = context
    let methods = []

    if (typeof context !== 'object') return console.error('Context is not valid')

    if (typeof method[1] === 'string') {
      methods.push(method[1])
    } else if (Array.isArray(method[1])) {
      methods = method[1]
    }

    if (!Array.isArray(methods) || methods.length === 0) return console.error(sendErrorMsg)

    methods.forEach((key) => {
      if (typeof key !== 'string') console.error(sendErrorMsg)
      func = func[key]
    })

    result = await func.call(context, ...args)
  }

  const t1 = performance.now()
  const funcTookMs = t1 - t0

  if (funcTookMs < timeout) {
    const timeToWait = timeout - funcTookMs
    await sleep(timeToWait)
  }

  return result
}
