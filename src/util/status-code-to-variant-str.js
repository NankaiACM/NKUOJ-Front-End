export default function (code) {
  const today = new Date();
  const isFoolsDay = today.getMonth() + 1 === 4 && today.getDate() === 1;
  const codeVariant = {
    99: 'secondary',
    100: 'secondary',
    107: isFoolsDay ? 'danger' : 'success',
    0: isFoolsDay ? 'danger' : 'success',
    1: isFoolsDay ? 'danger' : 'success',
    102: isFoolsDay ? 'success' : 'danger',
    2: isFoolsDay ? 'success' : 'danger',
    108: isFoolsDay ? 'danger' : 'success',
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
