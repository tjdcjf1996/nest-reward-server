    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.registerAsync(jwtConfig),
  providers: [JwtStrategy],
