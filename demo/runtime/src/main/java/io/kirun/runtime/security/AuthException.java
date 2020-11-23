package io.kirun.runtime.security;

import org.springframework.security.core.AuthenticationException;

public class AuthException extends AuthenticationException {

	private static final long serialVersionUID = 3003930807754718073L;
	
	public static final AuthException AUTH_MISSING = new AuthException("Authorization header missing. Expected a bearer token or basic authentication");
	public static final AuthException UNKNOWN_AUTH = new AuthException("Unknown authorization header.");

	public AuthException(String msg) {
		super(msg);
	}
}
