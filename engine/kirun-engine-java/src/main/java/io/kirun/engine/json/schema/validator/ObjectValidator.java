package io.kirun.engine.json.schema.validator;

import static io.kirun.engine.json.schema.validator.SchemaValidator.path;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.regex.Pattern;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonPrimitive;

import io.kirun.engine.json.schema.Schema;
import io.kirun.engine.json.schema.object.AdditionalPropertiesType;
import io.kirun.engine.repository.Repository;

public class ObjectValidator {

	public static void validate(List<String> parents, Schema schema, Repository<Schema> repository, JsonElement element) {

		if (element == null || element.isJsonNull())
			throw new SchemaValidationException(path(parents, schema.getTitle()), "Expected an object but found null");

		if (!element.isJsonObject())
			throw new SchemaValidationException(path(parents, schema.getTitle()),
					element.toString() + " is not an Object");

		JsonObject jsonObject = (JsonObject) element;
		Set<String> keys = new HashSet<>(jsonObject.keySet());

		checkMinMaxProperties(parents, schema, keys);

		if (schema.getPropertyNames() != null) {
			checkPropertyNameSchema(parents, schema, repository, keys);
		}

		if (schema.getRequired() != null) {
			checkRequired(parents, schema, jsonObject);
		}

		if (schema.getProperties() != null) {
			checkProperties(parents, schema, repository, jsonObject, keys);
		}

		if (schema.getPatternProperties() != null) {
			checkPatternProperties(parents, schema, repository, jsonObject, keys);
		}

		if (schema.getAdditionalProperties() != null) {
			checkAddtionalProperties(parents, schema, repository, jsonObject, keys);
		}

		if (schema.getDependencies() != null) {
			chekDependencies(parents, schema, jsonObject);
		}
	}

	private static void checkPropertyNameSchema(List<String> parents, Schema schema, Repository<Schema> repository,
			Set<String> keys) {
		for (String key : keys) {
			try {
				SchemaValidator.validate(parents, schema.getPropertyNames(), repository, new JsonPrimitive(key));
			} catch (SchemaValidationException sve) {
				throw new SchemaValidationException(path(parents, schema.getTitle()),
						"Property name '" + key + "' does not fit the property schema");
			}
		}
	}

	private static void chekDependencies(List<String> parents, Schema schema, JsonObject jsonObject) {
		JsonElement e = null;
		for (Entry<String, List<String>> dependency : schema.getDependencies().entrySet()) {

			e = jsonObject.get(dependency.getKey());
			if (e == null || e.isJsonNull())
				continue;

			for (String key : dependency.getValue()) {
				e = jsonObject.get(key);
				if (e == null || e.isJsonNull())
					throw new SchemaValidationException(path(parents, schema.getTitle()),
							dependency.getKey() + " requires " + key);
			}
		}
	}

	private static void checkRequired(List<String> parents, Schema schema, JsonObject jsonObject) {
		for (String key : schema.getRequired()) {
			if (jsonObject.get(key) == null || jsonObject.get(key).isJsonNull()) {
				throw new SchemaValidationException(path(parents, schema.getTitle()), key + " is mandatory");
			}
		}
	}

	private static void checkAddtionalProperties(List<String> parents, Schema schema, Repository<Schema> repository,
			JsonObject jsonObject, Set<String> keys) {
		AdditionalPropertiesType apt = schema.getAdditionalProperties();

		if (apt.getBooleanValue() != null) {

			if (!apt.getBooleanValue().booleanValue() && !keys.isEmpty()) {
				throw new SchemaValidationException(path(parents, schema.getTitle()),
						keys.toString() + " are additional properties which are not allowed.");
			}
		} else if (apt.getSchemaValue() != null) {

			for (String key : keys) {
				List<String> newParents = new ArrayList<>(parents == null ? List.of() : parents);
				newParents.add(key);
				JsonElement element = SchemaValidator.validate(newParents, apt.getSchemaValue(), repository,
						jsonObject.get(key));
				jsonObject.add(key, element);
			}
		}
	}

	private static void checkPatternProperties(List<String> parents, Schema schema, Repository<Schema> repository,
			JsonObject jsonObject, Set<String> keys) {
		Map<String, Pattern> compiledPatterns = new HashMap<>();
		for (String keyPattern : schema.getPatternProperties().keySet())
			compiledPatterns.put(keyPattern, Pattern.compile(keyPattern));

		List<String> goodKeys = new ArrayList<>(keys);

		for (String key : keys) {
			List<String> newParents = new ArrayList<>(parents == null ? List.of() : parents);
			newParents.add(key);

			for (Entry<String, Pattern> e : compiledPatterns.entrySet()) {
				if (e.getValue().matcher(key).matches()) {

					JsonElement element = SchemaValidator.validate(newParents,
							schema.getPatternProperties().get(e.getKey()), repository, jsonObject.get(key));
					jsonObject.add(key, element);
					goodKeys.add(key);
					break;
				}
			}
		}

		keys.removeAll(goodKeys);
	}

	private static void checkProperties(List<String> parents, Schema schema, Repository<Schema> repository,
			JsonObject jsonObject, Set<String> keys) {
		for (Entry<String, Schema> each : schema.getProperties().entrySet()) {

			List<String> newParents = new ArrayList<>(parents == null ? List.of() : parents);
			newParents.add(each.getKey());
			JsonElement element = SchemaValidator.validate(newParents, each.getValue(), repository,
					jsonObject.get(each.getKey()));
			jsonObject.add(each.getKey(), element);
			keys.remove(each.getKey());
		}
	}

	private static void checkMinMaxProperties(List<String> parents, Schema schema, Set<String> keys) {
		if (schema.getMinProperties() != null && keys.size() < schema.getMinProperties().intValue()) {
			throw new SchemaValidationException(path(parents, schema.getTitle()),
					"Object should have minimum of " + schema.getMinProperties() + " properties");
		}

		if (schema.getMaxProperties() != null && keys.size() > schema.getMaxProperties().intValue()) {
			throw new SchemaValidationException(path(parents, schema.getTitle()),
					"Object can have maximum of " + schema.getMaxProperties() + " properties");
		}
	}

	private ObjectValidator() {
	}

}
