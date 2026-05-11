  import jwt from "jsonwebtoken";
export function createtoken(userid: string) {
  const secret = process.env.JWT_SECRET;
  if (!userid) {
    throw new Error("User ID is required");
  }
  if (!secret) {
    throw new Error("JWT_SECRET is missing");
  }
  const token = jwt.sign(
    { id: userid },
    secret,
    { expiresIn: "1d" } 
  );
  return token;
}