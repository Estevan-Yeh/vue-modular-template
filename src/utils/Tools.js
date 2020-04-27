/**
 * 生成随机 ID
 * @return {String} id
 */
export const CreateId = () => {
  const str = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  let id = ''
  for (let i = 0; i < 8; i++) {
    id += str.charAt(Math.floor(Math.random() * str.length))
  }
  return id
}
