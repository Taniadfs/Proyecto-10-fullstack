const BASE_URL= 'http://localhost:5001' 

const apiFetch = async (endpoint, method= 'GET', body=null, token=null) => {
  const url = BASE_URL + endpoint
  const options={
    method: method,
    headers: {'Content-Type': 'application/json',
    Authorization : token? `Bearer ${token}`: undefined
  },
 }
 if (body) {
  options.body = JSON.stringify(body)
 } 
 try {
  const response = await fetch(url, options)
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message)
  }
  const data = await response.json()
  return data
} catch (error) {
  console.error('Error en la solicitud:', error)
  throw error
}
}

export default apiFetch
