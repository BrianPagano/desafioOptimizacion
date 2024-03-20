const generateUserErrorInfo = user => {
    return `one or more properties were incomplete or not valid
    list of required properties:
    * firstName : needs to be a string, received ${user.firstname},
    * lastName : needs to be a string, received ${user.lastName},
    * email : needs to be a string, received ${user.email},
    `
}

module.exports = generateUserErrorInfo