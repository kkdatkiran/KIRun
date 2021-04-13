package io.kirun.engine.json.schema.validator;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.google.gson.JsonElement;

import io.kirun.engine.json.schema.Schema;
import io.kirun.engine.json.schema.type.SchemaType;
import io.kirun.engine.repository.Repository;

public class SchemaValidator {

	public static JsonElement validate(List<String> parents, Schema schema, Repository<Schema> repository,
			JsonElement element) {

		if (schema == null)
			return element;

		if ((element == null || element.isJsonNull()) &&  schema.getDefaultValue() != null)
			return schema.getDefaultValue();

		if (schema.getConstant() != null)
			return schema.getConstant();
		
		if (schema.getEnums() != null && !schema.getEnums().isEmpty()) {
			return enumCheck(parents, schema, element);
		}

		if (schema.getType() != null) {
			typeValidation(parents, schema, repository, element);
		}

		if (schema.getOneOf() != null || schema.getAllOf() != null || schema.getAnyOf() != null) {
			AnyOfAllOfOneOfValidator.validate(parents, schema, repository, element);
		}

		if (schema.getNot() != null) {
			boolean flag = false;
			try {
				validate(parents, schema.getNot(), repository, element);
				flag = true;
			} catch (SchemaValidationException sve) {
				flag = false;
			}
			if (flag)
				throw new SchemaValidationException(path(parents, schema.getTitle()),
						"Schema validated value in not condition.");
		}

		return element;
	}

	private static JsonElement enumCheck(List<String> parents, Schema schema, JsonElement element) {

		boolean x = false;
		for (JsonElement e : schema.getEnums()) {
			if (e.equals(element)) {
				x = true;
				break;
			}
		}

		if (x)
			return element;
		else {
			throw new SchemaValidationException(path(parents, schema.getTitle()),
					"Value is not one of " + schema.getEnums());
		}
	}

	private static void typeValidation(List<String> parents, Schema schema, Repository<Schema> repository,
			JsonElement element) {

		boolean valid = false;
		List<SchemaValidationException> list = new ArrayList<>();
		for (SchemaType type : schema.getType().getAllowedSchemaTypes()) {

			try {
				TypeValidator.validate(parents, type, schema, repository, element);
				valid = true;
				break;
			} catch (SchemaValidationException sve) {
				valid = false;
				list.add(sve);
			}
		}

		if (!valid) {
			throw new SchemaValidationException(path(parents, schema.getTitle()),
					"Value " + element.toString() + " is not of valid type(s)", list);
		}
	}

	public static String path(List<String> parents, String title) {
		
		if (title == null) return  "";

		if (parents == null || parents.isEmpty())
			return title;

		return parents.stream().collect(Collectors.joining("/")) + "/" + title + " ";
	}

	private SchemaValidator() {
	}
}
