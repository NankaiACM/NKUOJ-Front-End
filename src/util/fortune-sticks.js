export default function (uid) {
  // Obtain Date info
  const date = new Date().getDate()
  const month = new Date().getMonth()
  const year = new Date().getFullYear()
  const day = new Date().getDay()
  const seedStr = `${uid}${date}${month}${year}`

  const seedRandom = require('seedrandom');
  const generator = seedRandom(seedStr);
  function rand() {
    return Math.floor(generator() * 1000000)
  }
  // Define result data
  const resultTitles = [
    {title: '大吉', type: 0},
    {title: '中吉', type: 1},
    {title: '中吉', type: 1},
    {title: '小吉', type: 1},
    {title: '小吉', type: 1},
    {title: '小吉', type: 1},
    {title: '小吉', type: 1},
    {title: '中平', type: 2},
    {title: '中平', type: 2},
    {title: '中平', type: 2},
    {title: '中平', type: 2},
    {title: '凶', type: 3},
    {title: '凶', type: 3},
    {title: '大凶', type: 4}]
  const secondaryTitlesGood = [
    {title: '玩 maimai', summary: 'All Perfect', day: 0},
    {title: '玩万智牌', summary: '赢麻了', day: 0},
    {title: '内卷', summary: '我卷死你们', day: 0},
    {title: '写代码', summary: '全部 AC', day: 0},
    {title: '赶 DDL', summary: '一天全部干完', day: 0},
    {title: '玩原神', summary: '有 OP？', day: 0},
    {title: '疯狂星期四', summary: 'v我50', day: 4},
    {title: '做高数题', summary: '如有神助', day: 0},
    {title: '+1s', summary: '做一点微小的贡献', day: 0},
    {title: '阅读TIC', summary: 'Thinking in C++', day: 0},
    {title: '上课', summary: '都听得懂', day: 1},
    {title: '熬夜', summary: '写完了所有的作业', day: 7},
    {title: '创高', summary: '一口气五公里', day: 0},
    {title: '求签', summary: '开启一日好心情', day: 0},
    {title: '学数据结构', summary: '学会了树套树', day: 0},
    {title: '学算法导论', summary: '学会了动态规划', day: 0},
    {title: '△', summary: '捡到各务原抚子', day: 0},
    {title: 'Codeforces', summary: '上了100分', day: 0},
    {title: '摸鱼', summary: '啊对对对', day: 0},
    {title: '去711', summary: '花光了所有的钱', day: 0},
    {title: '玩 GalGame', summary: '都是我老婆', day: 0},
    {title: '玩 Minecraft', summary: '挖到钻石', day: 0},
    {title: '女装', summary: '卡哇伊', day: 0},
    {title: '喝红茶', summary: '修身养性', day: 0},
    {title: '嘉然', summary: '今天吃什么', day: 0},
    {title: '上B站', summary: '你所热爱的就是你的生活', day: 0},
    {title: '元和西饼', summary: '好吃', day: 0},
  ]
  const secondaryTitlesBad = [
    {title: '玩 maimai', summary: '您被歌打了', day: 0},
    {title: '玩万智牌', summary: '爆地了', day: 0},
    {title: '内卷', summary: '考了 89 分', day: 0},
    {title: '写代码', summary: '全部 TLE', day: 0},
    {title: '赶 DDL', summary: '还是明天吧', day: 0},
    {title: '玩 ELDEN RING', summary: 'YOU DIED!', day: 0},
    {title: '疯狂星期四', summary: '可是今天不是星期四', day: 3},
    {title: '做高数题', summary: '积不出来', day: 0},
    {title: '-1s', summary: 'I\'m Angry!', day: 0},
    {title: '读C++语言程序设计', summary: '一句也看不懂', day: 0},
    {title: '上课', summary: '早八迟到', day: 1},
    {title: '熬夜', summary: '明天起不来', day: 7},
    {title: '创高', summary: '记录失效', day: 0},
    {title: '求签', summary: '不是大吉', day: 0},
    {title: '学数据结构', summary: '不会红黑树', day: 0},
    {title: '△', summary: '手机没信号', day: 0},
    {title: 'Codeforces', summary: '掉了100分', day: 0},
    {title: '摸鱼', summary: '可是你还有DDL', day: 0},
    {title: '去711', summary: '买一送一', day: 0},
    {title: '玩 GalGame', summary: '被舍友发现', day: 0},
    {title: '玩 Minecraft', summary: 'Creeper!', day: 0},
    {title: '女装', summary: '被大家拍下来', day: 0},
    {title: '喝红茶', summary: '哼！啊啊啊', day: 0},
    {title: '嘉然', summary: '今天创什么', day: 0},
    {title: '上B站', summary: '你 *什么时候*啊？', day: 0},
    {title: '元和西饼', summary: '卖完了', day: 0},
  ]
  // Obtain primary state
  const primaryKey = rand() % resultTitles.length
  const primaryState = {title: resultTitles[primaryKey].title, type: resultTitles[primaryKey].type}
  // Obtain secondary state
  let key1 = rand() % secondaryTitlesGood.length
  let key2 = rand() % secondaryTitlesGood.length
  let key3 = rand() % secondaryTitlesBad.length
  let key4 = rand() % secondaryTitlesBad.length
  while (secondaryTitlesGood[key1].day !== 0 && secondaryTitlesGood[key1].day !== day)
    key1 = rand() % secondaryTitlesGood.length
  while (key2 === key1 || (secondaryTitlesBad[key2].day !== 0 && secondaryTitlesBad[key2].day !== day))
    key2 = rand() % secondaryTitlesBad.length
  while (key3 === key2 || key3 === key1 || (secondaryTitlesGood[key3].day !== 0 && secondaryTitlesGood[key3].day !== day))
    key3 = rand() % secondaryTitlesGood.length
  while (key4 === key3 || key4 === key2 || key4 === key1 || (secondaryTitlesBad[key4].day !== 0 && secondaryTitlesBad[key4].day !== day))
    key4 = rand() % secondaryTitlesBad.length
  let goodList = [secondaryTitlesGood[key1], secondaryTitlesGood[key3]]
  let badList = [secondaryTitlesBad[key2], secondaryTitlesBad[key4]]
  if (primaryState.type === 0) {
    badList = [{title: '诸事皆宜', summary: ''}]
  } else if (primaryState.type === 4) {
    goodList = [{title: '诸事不宜', summary: ''}]
  }

  // Return stick result
  return {
    primary: primaryState,
    secondary: {
      good: goodList,
      bad: badList
    }
  }
}
