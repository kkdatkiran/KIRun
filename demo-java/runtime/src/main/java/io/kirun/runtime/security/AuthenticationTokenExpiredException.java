package io.kirun.runtime.security;

public class AuthenticationTokenExpiredException  extends RuntimeException {
	
	private static final long serialVersionUID = 3324668292673230109L;

	public AuthenticationTokenExpiredException() {
		super("Authentication token expired");
	}
}
