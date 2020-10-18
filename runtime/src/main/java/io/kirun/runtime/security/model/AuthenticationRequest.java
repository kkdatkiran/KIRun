package io.kirun.runtime.security.model;


import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class AuthenticationRequest {

	@NotNull
	@Size(min = 5, max = 100, message= "userId should be 5 - 100 characters.")
	private String userId;
	
	@NotNull
	@Size(min = 3, max = 100, message= "userId should be 3 - 100 characters.")
	private String password;
}
