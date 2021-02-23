package io.kirun.engine.json.schema.string;

import io.kirun.engine.json.schema.type.SchemaType;

public enum StringFormat {

	DATETIME, TIME, DATE, EMAIL, REGEX,

	;

	public static SchemaType genericValueOf(String type) {
		return SchemaType.valueOf(type.toUpperCase().replace("-", ""));
	}
}
