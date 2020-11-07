package io.kirun.runtime.exception.handler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import io.kirun.runtime.exception.DefaultRuntimeException;
import io.kirun.runtime.security.AuthException;
import io.kirun.runtime.web.model.RuntimeResponse;
import io.kirun.runtime.web.model.RuntimeResponse.ResponseType;

@ControllerAdvice
public class RuntimeResponseExceptionHandler extends ResponseEntityExceptionHandler {

	private static final Logger localLogger = LoggerFactory.getLogger(RuntimeResponseExceptionHandler.class);

	@ExceptionHandler({ Exception.class })
	@ResponseBody
	public ResponseEntity<RuntimeResponse<DefaultRuntimeException>> allExceptions(Exception ex) {

		return makeResponse(new DefaultRuntimeException(ex));
	}

	@ExceptionHandler({ AuthException.class })
	@ResponseBody
	public ResponseEntity<RuntimeResponse<DefaultRuntimeException>> authenticationException(AuthException ex) {

		return makeResponse(new DefaultRuntimeException(HttpStatus.UNAUTHORIZED, ex.getMessage(), null, ex));
	}

	@ExceptionHandler({ DefaultRuntimeException.class })
	@ResponseBody
	public ResponseEntity<RuntimeResponse<DefaultRuntimeException>> runtimeExceptions(DefaultRuntimeException ex) {

		return makeResponse(ex);
	}

	private ResponseEntity<RuntimeResponse<DefaultRuntimeException>> makeResponse(DefaultRuntimeException ex) {

		localLogger.error("{}", ex.getErrorCode(), ex);
		return ResponseEntity.status(ex.getStatus()).body(new RuntimeResponse<DefaultRuntimeException>().setType(ResponseType.ERROR).setError(ex));
	}
}
