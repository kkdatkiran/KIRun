package io.kirun.engine.json.schema.type;

import java.util.Set;

public interface Type {

	public Set<SchemaType> getAllowedSchemaTypes();
}
