const saveToken =  (token) => {localStorage.setItem('token', token) }
const recuperarToken = () => localStorage.getItem('token')
const removeToken = () => {localStorage.removeItem('token')}

export {saveToken, recuperarToken, removeToken}