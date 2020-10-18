package io.kirun.runtime.security.service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.kirun.runtime.security.AuthException;
import io.kirun.runtime.security.model.Authentication;
import io.kirun.runtime.security.model.AuthenticationRequest;
import io.kirun.runtime.security.model.User;
import io.kirun.runtime.security.util.JWTUtil;

@Service
public class AuthenticationService {

	@Value("${jwt.tokenExpirationMin}")
	private Long expiration;

	@Value("${jwt.secret}")
	private String secret;

	@Autowired
	private UserService userService;

	public Authentication authenticate(@Valid AuthenticationRequest authRequest) {

		User user = userService.findByUserIdPassword(authRequest.getUserId(), authRequest.getPassword());

		if (user == null)
			throw new AuthException("User '"+authRequest.getUserId()+"' not found.");

		Date expiresAt = Date.from(Instant.now().plus(expiration, ChronoUnit.MINUTES));
		String token = JWTUtil.generateToken(user.getUserId(), secret, expiresAt);

		return new Authentication().setExpiresAt(expiresAt).setToken(token).setUser(user);
	}

	public Authentication refreshAuthentication(String authToken) {

		if (!authToken.startsWith("Bearer"))
			throw AuthException.UNKNOWN_AUTH;

		String userId = JWTUtil.parseToken(authToken.substring(7).strip(), secret);
		
		if (userId == null)
			throw AuthException.UNKNOWN_AUTH;
		
		User user = userService.findByUserId(userId);

		Date expiresAt = Date.from(Instant.now().plus(expiration, ChronoUnit.MINUTES));
		String token = JWTUtil.generateToken(user.getUserId(), secret, expiresAt);

		return new Authentication().setExpiresAt(expiresAt).setToken(token).setUser(user);
	}

}
