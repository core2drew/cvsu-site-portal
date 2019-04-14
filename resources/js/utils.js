import queryString from 'querystring'

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
    .then(res => success())
    .catch(e => {
      console.log(e)
      error()
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