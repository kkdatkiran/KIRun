package io.kirun.runtime.model;

import java.io.Serializable;
import java.util.Date;

import lombok.Data;

@Data
public abstract class AbstractDataObject implements Serializable {

	private static final long serialVersionUID = 6279029630171763715L;
	
	private String createdBy;
	private Date createdAt;
	private String updatedBy;
	private Date updatedAt;
	
	public abstract String getId();
}
