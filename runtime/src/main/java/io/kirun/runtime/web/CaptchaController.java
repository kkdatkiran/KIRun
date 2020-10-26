package io.kirun.runtime.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.kirun.runtime.service.captcha.Captcha;
import io.kirun.runtime.service.captcha.CaptchaService;

@RequestMapping(CaptchaController.MAPPING)
@RestController
public class CaptchaController {

	public static final String MAPPING = "/api/captcha";

	@Autowired
	private CaptchaService captchaService;

	@GetMapping
	public ResponseEntity<RuntimeResponse<Captcha>> generateCaptcha(
			@RequestParam(required = false, defaultValue = "400") Integer width,
			@RequestParam(required = false, defaultValue = "150") Integer height) {

		return ResponseEntity.ok(new RuntimeResponse<Captcha>().setData(captchaService.generate(width, height)));
	}
}
