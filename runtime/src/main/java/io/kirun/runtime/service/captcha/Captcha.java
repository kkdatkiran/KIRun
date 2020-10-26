package io.kirun.runtime.service.captcha;

import java.io.Serializable;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class Captcha implements Serializable{

	private static final long serialVersionUID = -8987634193131389891L;

	private String captchaString;
	private String captchaImageURL;
}
