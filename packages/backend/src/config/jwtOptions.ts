import passport, { PassportStatic } from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { User } from '../entities/User';

interface IJwtPayload {
  id: string;
}

interface IDoneFunction {
  (error: Error | null, user?: User | false): void;
}

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

const jwtStrategyCallback = async (jwtPayload: IJwtPayload, done: IDoneFunction) => {
  try {
    const user = await User.findOneBy({ id: jwtPayload.id });
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (err) {
    return done(err as Error, false);
  }
};

passport.use(new JwtStrategy(options, jwtStrategyCallback));

export default passport as PassportStatic;
