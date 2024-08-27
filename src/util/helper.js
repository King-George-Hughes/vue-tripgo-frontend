export const formatDateTime = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

export const formatDate = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

export const formatTime = (dateString) => {
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  }
  return new Date(dateString).toLocaleTimeString(undefined, options)
}

export const formatDayOfWeek = (dateString) => {
  const options = {
    weekday: 'long'
  }
  return new Date(dateString).toLocaleDateString(undefined, options)
}
