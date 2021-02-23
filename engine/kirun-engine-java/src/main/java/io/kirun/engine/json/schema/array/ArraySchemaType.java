package io.kirun.engine.json.schema.array;

import java.util.List;

import io.kirun.engine.json.schema.Schema;
import lombok.Data;

@Data
public class ArraySchemaType {

	private Schema singleSchema;
	private List<Schema> tupleSchema;
}
