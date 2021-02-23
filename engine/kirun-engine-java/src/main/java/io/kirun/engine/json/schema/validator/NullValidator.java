package io.kirun.engine.json.schema.validator;

import static io.kirun.engine.json.schema.validator.SchemaValidator.path;

import java.util.List;

import com.google.gson.JsonElement;

import io.kirun.engine.json.schema.Schema;

public class NullValidator {

	public static void validate(List<String> parents, Schema schema, JsonElement element) {

		if (element != null && !element.isJsonNull())
			throw new SchemaValidationException(path(parents, schema.getTitle()),
					"Expected a null but found " + element);
	}

	private NullValidator() {
	}
}
