import bcryptjs from "bcryptjs";

const comparePassword = (
  password: string,
  userToCompare: string
): Promise<boolean> => {
  return bcryptjs.compare(password, userToCompare);
};

export default comparePassword;
