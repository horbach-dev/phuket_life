function multiply (result) {
  if (result === undefined) return 0

  const fn = (arg) => {
    if (arg === undefined) return result
    result *= arg

    return fn
  }

  return fn
}


console.log(multiply(0)(2)(2)())
