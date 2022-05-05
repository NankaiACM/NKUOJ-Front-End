export default function (code) {
  const codeText = {
    99: 'QUE',
    100: 'PROC',
    107: 'AC',
    0: 'AC',
    1: 'PE',
    102: 'WA',
    2: 'WA',
    108: 'AC*',
    101: 'CE',
    103: 'RE',
    4: 'RE',
    105: 'TLE',
    6: 'TLE',
    104: 'MLE',
    5: 'MLE',
    106: 'OLE',
    7: 'OLE',
    109: 'FLE',
    118: 'SE',
    98: 'PROC',
    110: 'MD',
    121: 'HID',
  }

  if (!(code in codeText)) {
    return `UNK`
  }
  return codeText[code]
}
