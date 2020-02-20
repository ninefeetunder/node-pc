let http = require('http')
let cheerio = require('cheerio')


http.get('http://tuijian.hao123.com/hotrank', (res) => {
  let data = ''
  res.on('data', (text) => {
    data += text
  })
  res.on('end', () => {
    filter(data)
  })
})

function filter (data) {
  let result = {}
  // 将页面源代码转换为$对象
  let $ = cheerio.load(data)
  let temp_div = $('.top-wrap')
  // 保存榜单title
  let temp_title = []
  temp_div.each((index, item) => {
    // 标题放在h2标签中
    temp_title.push($(item).find('h2').text())
    // 每个榜单的内容项
    let temp_arr = $(item).find('.point-bd').find('.point-title')
    let innerResult = result[temp_title[index]] = []
    temp_arr.each((index, item) => {
      innerResult.push($(item).text())
    })
  })
  console.log(result)
}