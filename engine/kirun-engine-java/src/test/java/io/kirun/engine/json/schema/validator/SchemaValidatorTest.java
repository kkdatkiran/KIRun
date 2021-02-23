package io.kirun.engine.json.schema.validator;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.Set;

import org.junit.jupiter.api.Test;

import com.google.gson.JsonPrimitive;

import io.kirun.engine.json.schema.Schema;
import io.kirun.engine.json.schema.type.MultipleType;
import io.kirun.engine.json.schema.type.SchemaType;

class SchemaValidatorTest {

	@Test
	void test() {

		assertEquals(new JsonPrimitive(20l),
				SchemaValidator.validate(null,
						new Schema().setType(new MultipleType().setType(Set.of(SchemaType.INTEGER, SchemaType.LONG))),
						null, new JsonPrimitive(20l)));

		Schema s = new Schema().setType(new MultipleType().setType(Set.of(SchemaType.INTEGER, SchemaType.LONG)));
		JsonPrimitive v = new JsonPrimitive(20.2f);
		assertThrows(SchemaValidationException.class,
				() -> SchemaValidator.validate(null, s, null, v),
				"Value 20.2 is not of valid type(s)");

	}

}
