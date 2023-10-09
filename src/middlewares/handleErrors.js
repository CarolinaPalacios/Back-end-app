const ERROR_HANDLERS = {
  CastError: res => res.status(400).send({ error: 'malformatted id' }),
  ValidationError: (res, error) => res.status(409).send({ error: error.message }),
  JsonWebTokenError: (res, error) => res.status(401).send({ error: error.message }),
  TokenExpiredError: (res) => res.status(401).send({ error: 'token expired' }),
  defaultError: res => res.status(500).end()
}

const handleErrors = (error, _req, res, _next) => {
  console.error(error.name)
  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError
  handler(res, error)
}

export default handleErrors;