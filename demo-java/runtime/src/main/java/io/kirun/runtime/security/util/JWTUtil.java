package io.kirun.runtime.security.util;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import io.kirun.runtime.security.AuthenticationTokenExpiredException;

public class JWTUtil {

	public static String parseToken(String token, String secret) {

		Claims claims = Jwts.parserBuilder()
				.setSigningKey(
						Keys.hmacShaKeyFor(Encoders.BASE64.encode(secret.getBytes(StandardCharsets.UTF_8)).getBytes()))
				.build().parseClaimsJws(token).getBody();

		if (claims == null)
			return null;

		if (Instant.now().isAfter(claims.getExpiration().toInstant()))
			throw new AuthenticationTokenExpiredException();

		return claims.getSubject();
	}

	public static String generateToken(String userId, String secret, Date expiration) {

		return Jwts.builder().setIssuer("KIRun").setSubject(userId).setIssuedAt(Date.from(Instant.now()))
				.setExpiration(expiration)
				.signWith(
						Keys.hmacShaKeyFor(Encoders.BASE64.encode(secret.getBytes(StandardCharsets.UTF_8)).getBytes()),
						SignatureAlgorithm.HS512)
				.compact();
	}

	private JWTUtil() {
	}
}
