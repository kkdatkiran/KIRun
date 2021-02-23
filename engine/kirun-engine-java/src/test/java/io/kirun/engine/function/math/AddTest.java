package io.kirun.engine.function.math;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;

import com.google.gson.JsonPrimitive;

import io.kirun.engine.model.Argument;

class AddTest {

	@Test
	void test() {
		assertEquals(new JsonPrimitive(4f), new Add()
				.execute(List.of(
						new Argument().setName("value").setValue(new JsonPrimitive(2)),
						new Argument().setName("value").setValue(new JsonPrimitive(2.0))
						
						)).getValue());
	}

}
