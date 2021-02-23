package io.kirun.engine.function.string;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.jupiter.api.Test;

import com.google.gson.JsonPrimitive;

import io.kirun.engine.model.Argument;

class ConcatenateTest {

	@Test
	void test() {
		assertEquals(new JsonPrimitive("TEST123"), new Concatenate()
				.execute(List.of(
						new Argument().setName("value").setValue(new JsonPrimitive("TEST")),
						new Argument().setName("value").setValue(new JsonPrimitive("12")),
						new Argument().setName("value").setValue(new JsonPrimitive("3"))
						
						)).getValue());
	}

}
