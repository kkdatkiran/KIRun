package io.kirun.engine.model;

import io.kirun.engine.json.schema.Schema;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class Returns {

	private Schema schema;
}
