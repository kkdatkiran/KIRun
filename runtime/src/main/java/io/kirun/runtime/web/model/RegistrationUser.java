package io.kirun.runtime.web.model;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import io.kirun.runtime.security.model.User;
import lombok.Data;

@Data
public class RegistrationUser {

	@Valid
	@NotNull
	private User user;

	@NotNull
	private String captcha;
	
	@NotNull
	private String captchaString;
}
