package io.kirun.runtime.exception;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.annotation.JsonIgnore;

import io.kirun.runtime.security.SecurityContextUtil;
import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Setter;

@Data
@EqualsAndHashCode(callSuper = true)
public class DefaultRuntimeException extends RuntimeException {

	private static final long serialVersionUID = -4852631600389305525L;

	@Setter(AccessLevel.NONE)
	private final HttpStatus status;

	@Setter(AccessLevel.NONE)
	private final String debugMessage;

	@Setter(AccessLevel.NONE)
	private final String stackTraceString;

	@Setter(AccessLevel.NONE)
	private final String errorCode;

	@Setter(AccessLevel.NONE)
	private final String userId;

	public DefaultRuntimeException() {
		this(HttpStatus.INTERNAL_SERVER_ERROR, "Uknown error occurred.", null, null);
	}

	public DefaultRuntimeException(String message) {
		this(HttpStatus.INTERNAL_SERVER_ERROR, message, null, null);
	}

	public DefaultRuntimeException(HttpStatus status, String message) {
		this(status, message, null, null);
	}

	public DefaultRuntimeException(HttpStatus status, Throwable exception) {
		this(status, exception.getMessage(), null, exception);
	}

	public DefaultRuntimeException(Throwable exception) {
		this(HttpStatus.INTERNAL_SERVER_ERROR, exception.getMessage(), null, exception);
	}

	public DefaultRuntimeException(String message, Throwable exception) {
		this(HttpStatus.INTERNAL_SERVER_ERROR, message, null, exception);
	}

	public DefaultRuntimeException(String message, String debugMessage) {
		this(HttpStatus.INTERNAL_SERVER_ERROR, message, debugMessage, null);
	}

	public DefaultRuntimeException(HttpStatus status, String message, String debugMessage, Throwable exception) {

		super(message, exception);
		this.userId = SecurityContextUtil.loggedInUsername();
		this.errorCode = new SimpleDateFormat("yyyyMMdd").format(Calendar.getInstance().getTime()) + "-"
				+ Long.toHexString(System.currentTimeMillis() % (1000 * 60 * 60 * 24l));
		this.status = status;
		if (debugMessage == null && exception != null) {
			this.debugMessage = exception.getMessage();
		} else {
			this.debugMessage = null;
		}

		if (exception != null) {

			String str = null;
			try (ByteArrayOutputStream bos = new ByteArrayOutputStream()) {
				exception.printStackTrace(new PrintStream(bos));
				str = new String(bos.toByteArray());
			} catch (Exception e) {
				str = null;
			}

			this.stackTraceString = str;
		} else {
			this.stackTraceString = null;
		}
	}

	@JsonIgnore
	@Override
	public StackTraceElement[] getStackTrace() {
		return super.getStackTrace();
	}

	@JsonIgnore
	@Override
	public synchronized Throwable getCause() {
		return super.getCause();
	}
}
