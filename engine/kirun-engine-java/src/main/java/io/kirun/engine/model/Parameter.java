package io.kirun.engine.model;

import io.kirun.engine.json.schema.Schema;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class Parameter {

	private String name;
	private Schema schema;
	private boolean variableArgument = false;
}
