package io.kirun.runtime.web.model;

import java.io.Serializable;

import io.kirun.runtime.exception.DefaultRuntimeException;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class RuntimeResponse<D extends Serializable> implements Serializable {

	private static final long serialVersionUID = -8083716073838325076L;

	private D data;
	private String message;
	private ResponseType type = ResponseType.SUCCESS;
	private DefaultRuntimeException error;

	public enum ResponseType {
		SUCCESS, ERROR, WARNING, INFORMATION
	}
}
