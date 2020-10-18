package io.kirun.runtime.security;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

public class AuthenticationToken extends UsernamePasswordAuthenticationToken {

	private static final long serialVersionUID = -6263416902052194143L;

	private String authentication;

	public AuthenticationToken(String authentication) {

		super(null, null);
		this.authentication = authentication;
	}

	public String getAuthentication() {
		return authentication;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();
		result = prime * result + ((authentication == null) ? 0 : authentication.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;

		if (obj instanceof AuthenticationToken) {
			return ((AuthenticationToken) obj).authentication.equals(this.authentication);
		}

		return false;
	}

}
