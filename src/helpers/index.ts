import crypto from "crypto";

const SECRET = "myDatabase_RestAPI";

//this function is to ecrpt the password
export const random = () => {
  crypto.randomBytes(128).toString("base64");
};
//function to create a sessionToken
export const authentication = (salt: string, password: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
};
