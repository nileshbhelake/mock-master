const user1Model = require("../models/user1.model");
const StudentModel = require("../models/student.model");
const { compare } = require("../helpers/encryption");
const { createToken, verifyToken } = require("../helpers/token");

const authCtrl = {
  async userLogin(req, res) {
    const sendErrorResponse = (status, message, error) => {
      res.status(status).send({ message, error });
    };

    try {
      const { userType, body } = req;

      const model = userType == "admin" ? user1Model : StudentModel;

      //get the user document based on he email

      const result = await model.findOne({ email: body?.email, status: 1 });
      if (!result)
        return sendErrorResponse(
          404,
          "User is disabled or not available",
          null
        );

      //check the user password
      if (compare(body.password, result?.password)) {
        //password is correct
        //create token
        const accessToken = createToken(
          {
            id: result?._id,
            role: result?.role,
            type: "access",
          },
          60 * 15
        );

        //refresh token
        const refreshToken = createToken(
          {
            id: result?._id,
            role: result?.role,
            type: "refresh",
          },
          60 * 30
        );

        res.set("x-accessToken", accessToken);
        res.set("x-refreshToken", refreshToken);
        res.status(200).send({ message: "Login Successful", data: result });
      } else {
        // password is incorrect
        sendErrorResponse(404, "Invalid password...", null);
      }
    } catch (err) {
      console.log(err);
      sendErrorResponse(500, "Could not login...", null);
    }
  }, //user login
  // validate token
  validateToken(req, res) {
    const { token } = req.body;
    const status = verifyToken(token);
    if (status) {
      //valid token
      res.status(200).send({ message: "Token is valid", data: { token } });
    } else {
      //invalid token
      res.status(403).send({ error: null, message: "Token is not valid" });
    }
  },

  refreshToken(req, res) {
    const { accessToken, refreshToken } = req.body;
    //validate the refresh token if it is valid then generate access token
    const payload = verifyToken(refreshToken);

    if (payload) {
      //generate the access token
      const atoken = createToken(
        {
          type: "access",
          role: payload.role,
          id: payload.id,
        },
        60 * 15
      );
      const rtoken = createToken(
        {
          type: "refresh",
          role: payload.role,
          id: payload.id,
        },
        60 * 30
      );
      res
        .status(200)
        .send({ data: { atoken, rtoken }, message: "Token refreshed..." });
    } else {
      // invalid refresh token
      //send error response
      res.status(406).send({ message: "token expired...", error: null });
    }
  },
};

module.exports = authCtrl;
// const { compare } = require("../helpers/encryption");
// const { createToken } = require("../helpers/token");
// const userModel = require("../models/user.model");

// module.exports = {
//   userLogin(req, res) {
//     const handleErrorResponse = (status, message, error) => {
//       res.status(status).send({ message, error });
//     };

//     const { email, password } = req.body;
//     //validate the email
//     userModel
//       .findOne({ email, status: 1 })
//       .then((result) => {
//         console.log(result);
//         if (!result) {
//           // invalid email
//           return handleErrorResponse(404, "Invalid email or user is disabled");
//         }
//         if (compare(password, result?.password)) {
//           // valid password
//           //   generate token
//           const token = createToken({
//             id: result?._id,
//             role: result?.role,
//           });
//           // add token in response
//           res.set("x-token", token);
//           // send response
//           res.status(200).send({ message: "Login successful", data: result });
//         } else {
//           // invalid password
//           return handleErrorResponse(500, "Invalid password...");
//         }
//       })
//       .catch((err) => {
//         // invalid email
//         return handleErrorResponse(404, "Invalid email or user is disabled...");
//       });
//   },
// };
