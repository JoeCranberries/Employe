import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const user = await Users.find();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const Register = async (req, res) => {
  const { name, email, password, confPassword } = req.body;
  if (password !== confPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
    });
    res.json({ msg: "Register Berhasil" });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const user = await Users.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const match = bcrypt.compareSync(req.body.password, user.password);
    if (!match) {
      return res.status(401).send({ message: "Invalid Password!" });
    }
    const userId = user._id;
    const name = user.name;
    const email = user.email;
    const accessToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "20s",
    });
    const refreshToken = jwt.sign({ userId, name, email }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    await user.updateOne(
      { refresh_token: refreshToken },
      {
        where: {
          id: user,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      id: user._id,
      name: user.name,
      // email: user.email,
      accessToken,
    });
  } catch (error) {
    res.status(404).json({ msg: "Email tidak ditemukan" });
  }
};

//  res.status(200).send({
//    id: user._id,
//    email: user.email,
//  });
// export const Login = async (req, res) => {
//   user
//     .findOne({
//       email: req.body.email,
//     })
//     .exec((err, user) => {
//       if (err) {
//         res.status(500).send({ message: err });
//         return;
//       }

//       if (!user) {
//         return res.status(404).send({ message: "User Not found." });
//       }

//       var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

//       if (!passwordIsValid) {
//         return res.status(401).send({ message: "Invalid Password!" });
//       }

//       var token = jwt.sign(
//         { id: user.id },
//         {
//           expiresIn: 86400, // 24 hours
//         }
//       );

//       req.session.token = token;

//       res.status(200).send({
//         id: user._id,
//         name: user.name,
//         email: user.email,
//       });
//     });
// };

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await Users.find({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user) return res.sendStatus(204);
  const userId = user._id;
  await Users.updateOne(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};
