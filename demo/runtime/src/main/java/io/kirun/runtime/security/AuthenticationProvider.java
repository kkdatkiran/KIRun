package io.kirun.runtime.security;

import java.util.Base64;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.AbstractUserDetailsAuthenticationProvider;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.kirun.runtime.security.model.User;
import io.kirun.runtime.security.service.UserService;
import io.kirun.runtime.security.util.JWTUtil;

@Component
public class AuthenticationProvider extends AbstractUserDetailsAuthenticationProvider {

	private final Logger localLogger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private UserService userService;

	@Value("${jwt.secret}")
	private String secret;

	@Override
	protected void additionalAuthenticationChecks(UserDetails userDetails,
			UsernamePasswordAuthenticationToken authentication) {
		// Nothing to be done here...
	}

	@Override
	protected UserDetails retrieveUser(String username, UsernamePasswordAuthenticationToken authentication) {

		AuthenticationToken token = (AuthenticationToken) authentication;
		localLogger.debug("Auth retrieve user");

		if (token.getAuthentication() == null || token.getAuthentication().isBlank())
			throw AuthException.AUTH_MISSING;

		User user = null;
		if (token.getAuthentication().startsWith("Bearer")) {

			try {
				user = userService
						.findByUserId(JWTUtil.parseToken(token.getAuthentication().substring(7).strip(), secret));
			} catch (Exception ex) {
				throw AuthException.UNKNOWN_AUTH;
			}
		} else if (token.getAuthentication().startsWith("Basic")) {

			String auth = new String(Base64.getDecoder().decode(token.getAuthentication().substring(5).strip()));
			if (auth.isBlank())
				throw AuthException.AUTH_MISSING;

			String[] splitAuth = auth.split(":");
			user = userService.findByUserIdPassword(splitAuth[0], splitAuth.length > 1 ? splitAuth[1] : null);

		} else {
			throw AuthException.AUTH_MISSING;
		}

		if (user == null)
			throw AuthException.UNKNOWN_AUTH;

		localLogger.debug("Found user : {}", user.getUsername());
		return user;
	}
}
