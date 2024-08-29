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

  // Ensure the input is a valid date
  const departure = new Date(departureTime)
  const arrival = new Date(arrivalTime)

  // Check if the date parsing failed
  if (isNaN(departure.getTime()) || isNaN(arrival.getTime())) {
    console.error('Invalid date format.')
    return ''
  }

  // Calculate the time difference in milliseconds
  const timeDifference = arrival - departure

  // If the difference is negative, return an empty string or handle as needed
  if (timeDifference < 0) {
    console.error('Arrival time is before departure time.')
    return ''
  }

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))

  // Construct the ISO 8601 duration string
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
