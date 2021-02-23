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

public class Add extends AbstractFunction {

	private static final String VALUE = "value";

	private static final Schema SCHEMA = new Schema().setTitle(VALUE).setType(new MultipleType()
			.setType(Set.of(SchemaType.DOUBLE, SchemaType.FLOAT, SchemaType.INTEGER, SchemaType.LONG)));

	private static final Schema RETURN_SCHEMA = new Schema().setTitle(VALUE).setType(new MultipleType()
			.setType(Set.of(SchemaType.DOUBLE, SchemaType.FLOAT, SchemaType.INTEGER, SchemaType.LONG)));

	private static final FunctionSignature SIGNATURE = new FunctionSignature().setName("Add").setNameSpace(MATH)
			.setParameters(List.of(new Parameter().setName(VALUE).setSchema(SCHEMA).setVariableArgument(true)))
			.setReturns(new Returns().setSchema(RETURN_SCHEMA));

	@Override
	public FunctionSignature getSignature() {
		return SIGNATURE;
	}

	@Override
	protected Result internalExecute(Map<String, List<Argument>> args) {

		Double d = 0d;
		SchemaType type = null;
		SchemaType newType = null;
		for (Argument arg : args.get(VALUE)) {
			JsonPrimitive pValue = (JsonPrimitive) arg.getValue();
			newType = PrimitiveUtil.findPrimitiveType(pValue);
			if (type == null || type.ordinal() < newType.ordinal())
				type = newType;
			d += pValue.getAsDouble();
		}

		if (type == SchemaType.DOUBLE)
			return new Result().setValue(new JsonPrimitive(d));

		if (type == SchemaType.FLOAT)
			return new Result().setValue(new JsonPrimitive(d.floatValue()));

		if (type == SchemaType.LONG)
			return new Result().setValue(new JsonPrimitive(Math.abs(d.longValue())));

		return new Result().setValue(new JsonPrimitive(Math.abs(d.intValue())));
	}
}
