package io.kirun.engine.function.string;

import static io.kirun.engine.function.namespaces.Namespaces.STRING;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.google.gson.JsonElement;
import com.google.gson.JsonPrimitive;

import io.kirun.engine.function.AbstractFunction;
import io.kirun.engine.json.schema.Schema;
import io.kirun.engine.json.schema.type.SchemaType;
import io.kirun.engine.json.schema.type.SingleType;
import io.kirun.engine.model.Argument;
import io.kirun.engine.model.FunctionSignature;
import io.kirun.engine.model.Parameter;
import io.kirun.engine.model.Result;
import io.kirun.engine.model.Returns;

public class Concatenate extends AbstractFunction {

	private static final String VALUE = "value";

	private static final Schema SCHEMA = new Schema().setTitle(VALUE)
			.setType(new SingleType().setType(SchemaType.STRING));

	private static final FunctionSignature SIGNATURE = new FunctionSignature().setName("Concatenate")
			.setNameSpace(STRING)
			.setParameters(List.of(new Parameter().setName(VALUE).setSchema(SCHEMA).setVariableArgument(true)))
			.setReturns(new Returns().setSchema(SCHEMA));

	@Override
	public FunctionSignature getSignature() {
		return SIGNATURE;
	}

	@Override
	protected Result internalExecute(Map<String, List<Argument>> args) {

		return new Result().setValue(new JsonPrimitive(args.get(VALUE).stream().sorted().map(Argument::getValue)
				.map(JsonElement::getAsString).collect(Collectors.joining(""))));
	}
}
