import queryString from 'querystring'
import moment from 'moment';

export const get = (url, params, success, error) => {
  if (Object.keys(params).length > 0) {
    url += `?${queryString.stringify(params)}`
  }
  return fetch(url, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    },
    credentials: 'same-origin' //for session to work
  })
    .then(res => {
      if (!res.ok) {
        throw Error(res.statusText)
      }
      return res
    })
    .then(res => res.json())
    .then(res => success(res))
    .catch(e => {
      console.log(e)
      error()
    })
}

export const post = (url, body, success, error, method = 'POST') => {
  return fetch(url, {
    method,
    headers: {
      'Accept': 'application/json, text-plain, */*',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    },
    credentials: 'same-origin', //for session to work
    body: JSON.stringify(body)
  })
    .then(res => {
      if (!res.ok) {
        throw Error(res.statusText)
      }
      return res
    })
    .then(res => res.json())
    .then(res => success(res))
    .catch(e => {
      console.log(e)
      error()
    })
}

export const updateProfileImage = (body, success, error) => {
  const formData  = new FormData()
  formData.append('id', body.id)
  formData.append('image', body.image)
  return fetch('/ajax/portal/user/profile-image', {
    method: 'POST',
    headers: {
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    },
    credentials: 'same-origin', //for session to work
    body: formData
  })
    .then(res => {
      if (!res.ok) {
        throw Error(res.statusText)
      }
      return res
    })
    .then(res => res.json())
    .then(res => success(res))
    .catch(e => {
      console.log(e)
      error()
    })
}

export const fromToDate = (from, to, oneDayFormat, sameMonthFormat, nextMonthFormat) => {
  let _fromDate = moment(from)
  let _toDate = moment(to)
  
  let daysBetweenDates = _toDate.diff(_fromDate, 'days')
  let isSameMonth = _fromDate.isSame(_toDate, 'month')
  let activityDate = ''
  
  if(isSameMonth) {
    activityDate = _fromDate.format(oneDayFormat)
    if(daysBetweenDates > 0) {
      activityDate = `${activityDate} - ${_toDate.format(sameMonthFormat)}`
    }
  } else {
    activityDate = `${_fromDate.format(nextMonthFormat)} / ${_toDate.format(nextMonthFormat)}`
  }

  return activityDate
}