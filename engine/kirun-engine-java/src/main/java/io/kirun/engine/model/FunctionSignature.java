package io.kirun.engine.model;

import java.util.List;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class FunctionSignature {

	private String name;
	private List<Parameter> parameters;
	private Returns returns;
	private String nameSpace;
}
