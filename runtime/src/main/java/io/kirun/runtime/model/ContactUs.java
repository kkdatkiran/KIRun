package io.kirun.runtime.model;

import java.io.Serializable;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.Id;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)

public class ContactUs extends AbstractDataObject implements Serializable {

	private static final long serialVersionUID = -4426870121443331548L;

	@Id
	private String id;

	@NotNull
	@Size(min = 3, max = 100, message = "Name should be at least 3 characters and maximum 100 characters long.")
	private String name;

	@NotNull
	@Size(min = 3, max = 100, message = "Name should be at least 3 characters and maximum 100 characters long.")
	private String message;

	@NotNull
	@Size(min = 3, max = 100, message = "Name should be at least 3 characters and maximum 100 characters long.")
	private String email;

	private boolean replied = false;

	@Override
	public String getId() {

		return this.id;
	}

}
