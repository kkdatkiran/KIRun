package io.kirun.runtime.web;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.kirun.runtime.security.service.UserService;
import io.kirun.runtime.service.captcha.CaptchaService;
import io.kirun.runtime.web.model.RegistrationUser;
import io.kirun.runtime.web.model.RuntimeResponse;

@RestController
@RequestMapping(RegistrationController.MAPPING)
public class RegistrationController {

	public static final String MAPPING = "/api/registration";

	public static final String USER_ID_CHECK = "/userIdCheck";
	public static final String EMAIL_ID_CHECK = "/emailIdCheck";

	@Autowired
	private UserService userService;

	@Autowired
	private CaptchaService captchaService;

	@PostMapping
	public ResponseEntity<RuntimeResponse<Boolean>> register(@RequestBody @Valid RegistrationUser regUser) {

		captchaService.validate(regUser.getCaptcha(), regUser.getCaptchaString());
		return ResponseEntity.ok(new RuntimeResponse<Boolean>().setData(userService.register(regUser.getUser())));
	}

	@GetMapping(EMAIL_ID_CHECK)
	public ResponseEntity<RuntimeResponse<Boolean>> emailIdCheck(@RequestParam String email) {
		return ResponseEntity.ok(new RuntimeResponse<Boolean>().setData(userService.checkEmailIdExists(email)));
	}
}
