function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const ensureTimeout = async(method, timeout, ...args) => {
  const methodWithContext = Array.isArray(method)
  const methodWithoutContext = typeof method === 'function'
  const t0 = performance.now()
  let result

  if (methodWithoutContext) {
    result = await method(...args)
  } else if (methodWithContext) {
    const sendErrorMsg = 'Send is not valid for the context. A String or Array of strings is required'
    const context = method[0]
    let send

    if (typeof context !== 'object') return console.error('Context is not valid')

    if (typeof method[1] === 'string') {
      send = [method[1]]
    } else if (Array.isArray(method[1])) {
      send = method[1]
    }

    if (!Array.isArray(send) || send.length === 0) return console.error(sendErrorMsg)
    send.forEach((key) => { if (typeof key !== 'string') console.error(sendErrorMsg) })

    if (send.length === 1) result = await context[send[0]](...args)
    else if (send.length === 2) result = await context[send[0]][send[1]](...args)
  }

  const t1 = performance.now()
  const funcTookMs = t1 - t0

  if (funcTookMs < timeout) {
    const timeToWait = timeout - funcTookMs
    await sleep(timeToWait)
  }

  return result
}
