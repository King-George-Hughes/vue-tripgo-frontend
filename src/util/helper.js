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

export const getRecurrenceInterval = (departureTime, arrivalTime) => {
  if (!departureTime || !arrivalTime) return ''

  const departure = new Date(departureTime)
  const arrival = new Date(arrivalTime)

  if (isNaN(departure.getTime()) || isNaN(arrival.getTime())) {
    console.error('Invalid date format.')
    return ''
  }

  const timeDifference = arrival - departure

  if (timeDifference < 0) {
    console.error('Arrival time is before departure time.')
    return ''
  }

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))

  let duration = 'PT'

  if (days > 0) {
    duration += `${days}d`
  }
  if (hours > 0) {
    duration += `${hours}h`
  }
  if (minutes > 0) {
    duration += `${minutes}m`
  }

  return duration
}
