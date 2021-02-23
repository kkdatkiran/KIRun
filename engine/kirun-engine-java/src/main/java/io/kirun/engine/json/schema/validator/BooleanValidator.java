package io.kirun.engine.json.schema.validator;

import static io.kirun.engine.json.schema.validator.SchemaValidator.path;

import java.util.List;

import com.google.gson.JsonElement;
import com.google.gson.JsonPrimitive;

import io.kirun.engine.json.schema.Schema;

public class BooleanValidator {

	public static void validate(List<String> parents, Schema schema, JsonElement element) {

		if (element == null || element.isJsonNull())
			throw new SchemaValidationException(path(parents, schema.getTitle()), "Expected a boolean but found null");

		if (!element.isJsonPrimitive() || !((JsonPrimitive) element).isBoolean())
			throw new SchemaValidationException(path(parents, schema.getTitle()),
					element.toString() + " is not a boolean");
	}

	private BooleanValidator() {
	}
}
