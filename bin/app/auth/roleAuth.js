const deniedMessage = {
  message: "Access Denied",
  err: null
}

const authAdmin = async (req, res, next) => {
  try {

    const role = req.userData.role
    if (role !== "admin") {
      return res.status(403).json({
        status: false,
        message: deniedMessage
      })
    }

    next()
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Internal error",
      err: error
    });
  }

}

const authOperator = async (req, res, next) => {
  try {

    const role = req.userData.role
    if (role !== "operator") {
      return res.status(403).json({
        status: false,
        message: deniedMessage
      })
    }

    next()
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Internal error",
      err: error
    });
  }

}

const authCitizen = async (req, res, next) => {
  try {

    const role = req.userData.role
    if (role !== "citizen") {
      return res.status(403).json({
        status: false,
        message: deniedMessage
      })
    }

    next()
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Internal error",
      err: error
    });
  }

}

const authAdminOperator = async (req, res, next) => {
  try {

    const role = req.userData.role
    if (role !== "admin" && role !== "operator") {
      return res.status(403).json({
        status: false,
        message: deniedMessage
      })
    }

    next()
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Internal error",
      err: error
    });
  }

}

const authAdminCitizen = async (req, res, next) => {
  try {

    const role = req.userData.role
    if (role !== "admin" && role !== "citizen") {
      return res.status(403).json({
        status: false,
        message: deniedMessage
      })
    }

    next()
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Internal error",
      err: error
    });
  }

}

const authOperatorCitizen = async (req, res, next) => {
  try {

    const role = req.userData.role
    if (role !== "citizen" && role !== "operator") {
      return res.status(403).json({
        status: false,
        message: deniedMessage
      })
    }

    next()
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Internal error",
      err: error
    });
  }

}

module.exports = { authCitizen, authAdmin, authOperator, authAdminOperator, authAdminCitizen, authOperatorCitizen}