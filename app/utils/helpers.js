import { message} from 'antd'

export const getErrorMessage = (error, defaultMessage = '') => {
  if (typeof error === 'object' && error !== null && error.message) {
    return error.message
  }

  return defaultMessage
}

export const showErrorTip = (error, defaultMessage) => message.error(getErrorMessage(error, defaultMessage))

export const showSuccessTip = (tip) => message.success(tip)

export const removeHMS = (timeString) => {
  if (isString(timeString)) {
    return timeString.split(' ')[0]
  }
  return timeString
}