package io.kirun.engine.json.schema.string;

import io.kirun.engine.json.schema.Schema;
import io.kirun.engine.json.schema.type.SchemaType;
import io.kirun.engine.json.schema.type.SingleType;
import io.kirun.engine.json.schema.type.Type;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

@EqualsAndHashCode(callSuper = true)
@Data
@Accessors(chain = true)
public class StringSchema extends Schema{


	private static final long serialVersionUID = 5665601576555771876L;

	@Override
	public Type getType() {
		return new SingleType().setType(SchemaType.STRING);
	}
}
