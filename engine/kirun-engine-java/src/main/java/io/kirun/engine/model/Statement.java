package io.kirun.engine.model;

import lombok.Data;

@Data
public class Statement {

	private String id;
	private String expression;
	private StatementType type;
}
