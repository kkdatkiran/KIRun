package io.kirun.engine.function.math;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.jupiter.api.Test;

import com.google.gson.JsonPrimitive;

import io.kirun.engine.model.Argument;

class AbsTest {

	@Test
	void test() {

		assertEquals(new JsonPrimitive(2.3f), new Abs()
				.execute(List.of(new Argument().setName("value").setValue(new JsonPrimitive(-2.3f)))).getValue());
	}

}
