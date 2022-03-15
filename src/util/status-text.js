export default function (code) {
  const codeText = {
    99: '排队中...',
    100: '评测中...',
    107: '答案正确',
    102: '答案错误',
    108: '答案正确*',
    101: '编译失败',
    103: '运行时错误',
    105: '运行超时',
    104: '内存超限',
    106: '输出超限',
    109: '函数数量超限',
    118: '评测系统错误',
    98: '正在编译',
    110: '多组数据',
    121: '被隐藏',
  }

  if (!(code in codeText)) {
    return `[${code}] 未知状态`
  }
  return codeText[code]
}
