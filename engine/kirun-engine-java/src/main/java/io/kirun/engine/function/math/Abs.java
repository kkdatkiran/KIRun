package io.kirun.engine.function.math;

import static io.kirun.engine.function.namespaces.Namespaces.MATH;

import java.util.List;
import java.util.Map;
import java.util.Set;

import com.google.gson.JsonPrimitive;

import io.kirun.engine.function.AbstractFunction;
import io.kirun.engine.function.util.PrimitiveUtil;
import io.kirun.engine.json.schema.Schema;
import io.kirun.engine.json.schema.type.MultipleType;
import io.kirun.engine.json.schema.type.SchemaType;
import io.kirun.engine.model.Argument;
import io.kirun.engine.model.FunctionSignature;
import io.kirun.engine.model.Parameter;
import io.kirun.engine.model.Result;
import io.kirun.engine.model.Returns;

public class Abs extends AbstractFunction {

	private static final String VALUE = "value";
	
	private static final Schema SCHEMA = new Schema().setTitle(VALUE).setType(new MultipleType()
			.setType(Set.of(SchemaType.DOUBLE, SchemaType.FLOAT, SchemaType.INTEGER, SchemaType.LONG)));

	private static final FunctionSignature SIGNATURE = new FunctionSignature().setName("Abs").setNameSpace(MATH)
			.setParameters(List.of(new Parameter().setName(VALUE).setSchema(SCHEMA)))
			.setReturns(new Returns().setSchema(SCHEMA));

	@Override
	public FunctionSignature getSignature() {
		return SIGNATURE;
	}

	@Override
	protected Result internalExecute(Map<String, List<Argument>> args) {

		JsonPrimitive pValue = (JsonPrimitive) args.get(VALUE).get(0).getValue();
		SchemaType type = PrimitiveUtil.findPrimitiveType(pValue);

		if (type == SchemaType.DOUBLE)
			return new Result().setValue(new JsonPrimitive(Math.abs(pValue.getAsDouble())));
		
		if (type == SchemaType.FLOAT)
			return new Result().setValue(new JsonPrimitive(Math.abs(pValue.getAsFloat())));
		
		if (type == SchemaType.LONG)
			return new Result().setValue(new JsonPrimitive(Math.abs(pValue.getAsLong())));

		return new Result().setValue(new JsonPrimitive(Math.abs(pValue.getAsInt())));	
	}
}
