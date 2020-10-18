package io.kirun.runtime.exception;

import org.springframework.http.HttpStatus;

public class NotFoundException extends DefaultRuntimeException {

	private static final long serialVersionUID = -8481604225697382621L;

	public NotFoundException(String message) {
		super(HttpStatus.NOT_FOUND, message, null, null);
	}
	
	public NotFoundException(String message, String debugMessage) {
		super(HttpStatus.NOT_FOUND, message, debugMessage, null);
	}
}
