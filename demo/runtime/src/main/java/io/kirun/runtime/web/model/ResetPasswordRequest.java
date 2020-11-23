package io.kirun.runtime.web.model;

import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class ResetPasswordRequest {

	@NotNull
	private String userId;
	
	@NotNull
	private String password;
	
	@NotNull
	private String resetPasswordString;

	@NotNull
	private String captcha;

	@NotNull
	private String captchaString;
}
