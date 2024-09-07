import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "90d",  // Token valid for 90 days
  });

  res.cookie("jwt", token, {
    httpOnly: true, // Prevents client-side access to the cookie
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    sameSite: "strict", // Helps mitigate CSRF attacks
    maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days (in milliseconds)
  });
};

export default generateToken;
