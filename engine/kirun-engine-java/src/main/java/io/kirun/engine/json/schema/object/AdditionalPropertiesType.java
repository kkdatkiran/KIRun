package io.kirun.engine.json.schema.object;

import java.io.Serializable;

import io.kirun.engine.json.schema.Schema;
import lombok.Data;

@Data
public class AdditionalPropertiesType  implements Serializable{
	
	private static final long serialVersionUID = -3710026689972221380L;
	
	private Boolean booleanValue;
	private Schema schemaValue;
}
