// JavaScript 表達月份 (month) 是從 0 到 11，0 是一月；11 是十二月。
const expenseSeeds = [
  {
    name: "午餐",
    date: new Date(2022, 5, 23),
    amount: 60,
    category: "餐飲食品"
  },
  {
    name: "晚餐",
    date: new Date(2022, 5, 23),
    amount: 60,
    category: "餐飲食品"
  },
  {
    name: "捷運",
    date: new Date(2022, 5, 23),
    amount: 120,
    category: "交通出行"
  },
  {
    name: "電影：驚奇隊長",
    date: new Date(2022, 5, 23),
    amount: 220,
    category: "休閒娛樂"
  },
  {
    name: "租金",
    date: new Date(2022, 5, 1),
    amount: 25000,
    category: "家居物業"
  }
]

module.exports = expenseSeeds
