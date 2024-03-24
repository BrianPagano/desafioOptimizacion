const EErrors = require("../../handlers/errors/enum-errors")

const errorMiddleware = (error, req, res, next) => {
console.log ('Error del middleware es:', error.cause)
switch (error.code) {
    case EErrors.INVALID_USER_INFO:
        res.status (EErrors.INVALID_USER_INFO).json ({status: 'error', error: error.message})
        break

    case EErrors.NOT_FOUND:
        res.status (EErrors.NOT_FOUND).json ({status: 'error', error: error.message})
        break

    case EErrors.PRODUCT_CREATION_ERROR:
        res.status (EErrors.PRODUCT_CREATION_ERROR).json ({status: 'error', error: error.message})
        break

    case EErrors.SERVER_GATEWAY_ERROR:
        res.status (EErrors.SERVER_GATEWAY_ERROR).json ({status: 'error', error: error.message})
        break

    case EErrors.NOT_AUTHORIZED:
        res.status (EErrors.NOT_AUTHORIZED).json ({status: 'error', error: error.message})
        break

    case EErrors.PRODUCT_NOT_FOUND:
        res.status (EErrors.PRODUCT_NOT_FOUND).json ({status: 'error', error: error.message})
        break

    default:
        res.status(EErrors.INTERNAL_SERVER_ERROR).json({status: 'error', error: 'Internal server error'})
        break
 }
}

module.exports = errorMiddleware