package io.kirun.engine.json.schema.array;

import java.io.Serializable;
import java.util.List;

import io.kirun.engine.json.schema.Schema;
import lombok.Data;

@Data
public class ArraySchemaType implements Serializable {

	private static final long serialVersionUID = -3312223652146445370L;
	
	private Schema singleSchema;
	private List<Schema> tupleSchema;
}
