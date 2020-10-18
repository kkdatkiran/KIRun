package io.kirun.runtime.web.model;

import java.io.Serializable;

import javax.validation.constraints.Size;

import org.springframework.lang.NonNull;

import lombok.Data;

@Data
public class PasswordChangeRequest implements Serializable {

	private static final long serialVersionUID = 765484513844977320L;

	private String userId;

	private String oldPassword;

	@NonNull
	@Size(min = 3, max = 100, message = "Password should be at least 3 characters long and maximum 100 characters.")
	private String newPassword;
}
