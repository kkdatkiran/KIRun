package io.kirun.engine.json.schema.type;

import java.util.Set;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class SingleType implements Type {
	
	private SchemaType type;

	public Set<SchemaType> getAllowedSchemaTypes() {
		return Set.of(type);
	}
}
