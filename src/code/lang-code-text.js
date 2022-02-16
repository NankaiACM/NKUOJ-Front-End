export default function (code) {
  const codeText = {
    0: 'C',
    1: 'C++',
    2: 'Python',
    3: 'Javascript',
    4: 'Go',
    5: 'Text',
    6: 'Pypy3',
  }

  if (!(code in codeText)) {
    return `[${code}] 未知语言`
  }
  return codeText[code]
}
