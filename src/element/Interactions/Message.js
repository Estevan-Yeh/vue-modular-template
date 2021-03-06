import { Message, MessageBox, Notification } from 'element-ui'

/**
 * 以下方法的 others
 * @param {Object} others - 为 element-ui 对应方法的所有可用参数
 */

// 消息提示
export const ShowMessage = (
  message = '消息提示',
  type = 'info',
  others = {}
) => {
  return new Promise((resolve, reject) => {
    Message({
      showClose: true,
      message,
      type,
      ...others
    })
  })
}

// 弹窗
export const ShowConfirm = (
  message = '消息提示',
  title = '消息',
  others = {}
) => {
  return new Promise((resolve, reject) => {
    MessageBox.confirm(message, title, {
      ...others
    })
      .then(() => {
        resolve()
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 悬浮页面角落的消息提示
export const ShowNotification = (message, title, others) => {
  Notification({
    message,
    title,
    ...others
  })
}
