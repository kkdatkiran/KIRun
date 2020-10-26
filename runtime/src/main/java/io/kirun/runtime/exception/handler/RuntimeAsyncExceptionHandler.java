package io.kirun.runtime.exception.handler;

import java.lang.reflect.Method;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.aop.interceptor.AsyncUncaughtExceptionHandler;

import io.kirun.runtime.exception.DefaultRuntimeException;

public class RuntimeAsyncExceptionHandler implements AsyncUncaughtExceptionHandler {

	private static final Logger logger = LoggerFactory.getLogger(RuntimeAsyncExceptionHandler.class);

	@Override
	public void handleUncaughtException(Throwable th, Method method, Object... params) {

		DefaultRuntimeException ex = new DefaultRuntimeException(
				"Async exception : " + th.getMessage() + "\nIn : " + method.getName() + "\nParams : \n"
						+ Stream.of(params).map(Object::toString).collect(Collectors.joining("\n\n")),
				th);
		logger.error("{}", ex.getErrorCode(), ex);
	}
}
