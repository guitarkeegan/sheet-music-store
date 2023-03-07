import bcrypt from 'bcrypt';
import { SignJWT, jwtVerify } from 'jose';
import { db } from './db';

// async by default
export const hashPassword = (password: string) => bcrypt.hash(password, 10);

export const comparePasswords = (plainTextPassword: string, hashedPassword: string) => bcrypt.compare(plainTextPassword, hashedPassword);


// in production, have a team for this, or use a service. hard to get it right
// max amilliano - full stack authentication course
// clerk, SuperTokens, NextAuth
export const createJWT = (user) => {
    // return jwt.sign({ id: user.id }, 'cookies')
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60 * 60 * 24 * 7;

    // used id and email because they are unique fields
    // could also check for roles and permissions here
    // keep in minimal
    return new SignJWT({ payload: { id: user.id, email: user.email } })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setExpirationTime(exp)
      .setIssuedAt(iat)
      .setNotBefore(iat)
      // generate the secret in production
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  };
  // TextEncoder turns the process.env.JWT_SECRET into a buffer

  export const validateJWT = async (jwt: string) => {
    const { payload } = await jwtVerify(
      jwt,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
  
    return payload.payload as any;
  };

  export const getUserFromCookie = async (cookies) => {
    const jwt = cookies.get(process.env.COOKIE_NAME);
  
    const { id } = await validateJWT(jwt.value);
  
    const user = await db.user.findUnique({
      where: {
        id: id as string,
      },
    });
  
    return user;
  };