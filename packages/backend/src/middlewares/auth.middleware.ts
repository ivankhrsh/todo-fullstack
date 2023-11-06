import PassportStatic from '../config/jwtOptions';

export const authenticate = (strategy: string) =>
  PassportStatic.authenticate(strategy, { session: false });
