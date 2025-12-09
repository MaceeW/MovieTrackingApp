export function normalizeIsbn(input = '') {
  return (input || '').replace(/[^0-9Xx]/g, '')
}

export function isValidIsbn10(input = '') {
  const s = normalizeIsbn(input)
  if (s.length !== 10) return false
  let sum = 0
  for (let i = 0; i < 9; i++) {
    const c = s[i]
    if (c < '0' || c > '9') return false
    sum += (10 - i) * Number(c)
  }
  let last = s[9]
  let v = 0
  if (last === 'X' || last === 'x') v = 10
  else if (last >= '0' && last <= '9') v = Number(last)
  else return false
  sum += v
  return sum % 11 === 0
}

export function isValidIsbn13(input = '') {
  const s = normalizeIsbn(input)
  if (s.length !== 13) return false
  if (!/^[0-9]{13}$/.test(s)) return false
  let sum = 0
  for (let i = 0; i < 13; i++) {
    const n = Number(s[i])
    sum += i % 2 === 0 ? n : n * 3
  }
  return sum % 10 === 0
}

export function isValidIsbn(input = '') {
  const s = normalizeIsbn(input)
  return isValidIsbn10(s) || isValidIsbn13(s)
}

export default isValidIsbn
