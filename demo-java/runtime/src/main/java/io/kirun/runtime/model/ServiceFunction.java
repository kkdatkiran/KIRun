package io.kirun.runtime.model;

import java.io.Serializable;

import org.springframework.data.annotation.Id;

import io.kirun.engine.model.FunctionDefinition;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

@Data
@EqualsAndHashCode(callSuper = true)
@Accessors(chain = true)
public class ServiceFunction extends AbstractDataObject implements Serializable{

	private static final long serialVersionUID = -6652995048754352901L;
		
	private FunctionDefinition definition;
	private String name;
	
	@Id
	@Override
	public String getId() {
		return this.name;
	}
}
