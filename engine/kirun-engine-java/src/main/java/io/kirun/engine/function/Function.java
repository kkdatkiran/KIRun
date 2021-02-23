package io.kirun.engine.function;

import java.util.List;

import io.kirun.engine.model.Argument;
import io.kirun.engine.model.FunctionSignature;
import io.kirun.engine.model.Result;

public interface Function {

	public FunctionSignature getSignature();
	public Result execute(List<Argument> arguments);
}