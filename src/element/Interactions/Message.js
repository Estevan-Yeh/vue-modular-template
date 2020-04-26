import { Message, MessageBox, Notification } from 'element-ui'

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
