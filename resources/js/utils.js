import queryString from 'querystring'

export const get = (url, params, callback) => {
  if (Object.keys(params).length > 0) {
    url += `?${queryString.stringify(params)}`
  }
  return fetch(url, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    },
    credentials: 'same-origin' //for session to work
  })
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response
    })
    .then(response => {
      callback()
      return response.json()
    })
    .catch(e => {
      console.log(e)
    })
}

export const post = (url, body, success, error) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text-plain, */*',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    },
    credentials: 'same-origin', //for session to work
    body: JSON.stringify(body)
  })
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response
    })
    .then(response => {
      success(response.json())
      return response.json()
    })
    .catch(e => {
      console.log(e)
    })
}