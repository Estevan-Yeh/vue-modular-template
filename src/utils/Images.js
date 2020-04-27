// 调用时图片名和尺寸拼接格式 'imgName_imgSize'
const CutFlag = '_'
// 调用时 imgSize 宽度高度拼接格式 '100x100'
const SizeFlag = 'x'

// 需要使用的图片绝对路经，静态图片放于 static 下
const Images = {
  Logo: '/static/imgs/logo.png'
}

/**
 * 设置图片 url 尺寸后缀
 */
const getSize = size => {
  if (size) {
    const cutSize = size.split(SizeFlag)
    const width = cutSize[0] ? cutSize[0] : 'auto'
    const height = cutSize[1] ? cutSize[1] : 'auto'
    return `?width=${width}&height=${height}`
  } else {
    return ''
  }
}

/**
 * 封装图片 url
 *
 * @param {Array} imgList - 图片名
 * @param {Array} bundleNames - 绑定图片别名
 * 使用 vue 计算属性调用图片
 * ...Images(['Logo', 'Logo_10x20', 'Logo_20x10'], ['logo_1', 'logo_2'])
 * @return {Object}
    {
      logo_1 () {
        return 'url'
      },
      logo_2 () {
        return 'url?width=10&height=20'
      },
      Logo_20x10 () {
        return 'url?width=20&height=10'
      }
    }
 */
export default (imgList = [], bundleNames = []) => {
  let _imgList = {}

  imgList.map((val, index) => {
    const cutName = val.split(CutFlag)
    const imgName = cutName[0]
    const imgSize = cutName[1] ? cutName[1] : null

    if (bundleNames[index]) {
      _imgList[bundleNames[index]] = () => {
        return `${Images[imgName]}${getSize(imgSize)}`
      }
    } else {
      _imgList[val] = () => {
        return `${Images[imgName]}${getSize(imgSize)}`
      }
    }
  })

  return _imgList
}
