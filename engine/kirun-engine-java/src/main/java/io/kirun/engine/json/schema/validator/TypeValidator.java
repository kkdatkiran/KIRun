package io.kirun.engine.json.schema.validator;

import static io.kirun.engine.json.schema.validator.SchemaValidator.path;

import java.util.List;

import com.google.gson.JsonElement;

import io.kirun.engine.json.schema.Schema;
import io.kirun.engine.json.schema.type.SchemaType;
import io.kirun.engine.repository.Repository;

public class TypeValidator {

	public static void validate(List<String> parents, SchemaType type, Schema schema, Repository<Schema> repository,
			JsonElement element) {

		if (type == SchemaType.STRING) {
			StringValidator.validate(parents, schema, element);
		} else if (type == SchemaType.LONG || type == SchemaType.INTEGER || type == SchemaType.DOUBLE
				|| type == SchemaType.FLOAT) {
			NumberValidator.validate(type, parents, schema, element);
		} else if (type == SchemaType.BOOLEAN) {
			BooleanValidator.validate(parents, schema, element);
		} else if (type == SchemaType.OBJECT) {
			ObjectValidator.validate(parents, schema, repository, element);
		} else if (type == SchemaType.ARRAY) {
			ArrayValidator.validate(parents, schema, repository, element);
		} else if (type == SchemaType.NULL) {
			NullValidator.validate(parents, schema, element);
		} else {

			throw new SchemaValidationException(path(parents, schema.getTitle()), type + " is not a valid type.");
		}
	}

	private TypeValidator() {
	}
}
