package io.kirun.engine.model;

import java.util.Map;

import lombok.Data;

@Data
public class FunctionDefinition {

	private FunctionSignature signature;
	private Map<String, Statement> steps;
	private Map<String, String> flow;
}
