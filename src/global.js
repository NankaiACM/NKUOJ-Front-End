window.backendOrigin = window.location.origin
window.backendHost = window.location.host
window.backendPort = ''
if (process.env.NODE_ENV === 'development') {
  window.backendOrigin = 'http://localhost'
  window.backendHost = 'localhost'
}
