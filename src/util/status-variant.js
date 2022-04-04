export default function (code) {
  const codeVariant = {
    99: 'secondary',
    100: 'secondary',
    107: 'success',
    0: 'success',
    1: 'success',
    102: 'danger',
    2: 'danger',
    108: 'success',
    101: 'warning',
    103: 'primary',
    105: 'info',
    6: 'info',
    4: 'primary',
    5: 'info',
    104: 'info',
    106: 'dark',
    7: 'dark',
    109: 'dark',
    118: 'dark',
    110: 'dark',
    98: 'secondary',
    121: 'dark',
  }

  if (!(code in codeVariant)) {
    return 'dark'
  }
  return codeVariant[code]
}
