package io.kirun.engine.function.dynamic;

import java.util.List;
import java.util.Map;

import com.google.gson.JsonElement;

import io.kirun.engine.function.Function;
import io.kirun.engine.model.Argument;
import io.kirun.engine.model.FunctionDefinition;
import io.kirun.engine.model.FunctionSignature;
import io.kirun.engine.model.Result;

public class DynamicFunction implements Function {

	private FunctionDefinition def;
	private Map<String, JsonElement> context;

	public DynamicFunction(FunctionDefinition def) {
		this.def = def;
	}

	@Override
	public FunctionSignature getSignature() {
		return def.getSignature();
	}

	public void debug(List<Argument> arguments) {
		// to implement in future.
	}
	
	public void checkErrors() {
		
	}

	@Override
	public Result execute(List<Argument> arguments) {
		
		return null;
	}

}
