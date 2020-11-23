package io.kirun.runtime.web.model;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import io.kirun.runtime.model.ContactUs;
import lombok.Data;

@Data
public class ContactUsRequest {

	@Valid
	private ContactUs contactUs;

	@NotNull
	private String captcha;

	@NotNull
	private String captchaString;
}
