package io.kirun.runtime.security.web;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.kirun.runtime.repositories.IUserRepository;
import io.kirun.runtime.security.model.User;
import io.kirun.runtime.security.service.UserService;
import io.kirun.runtime.service.captcha.CaptchaService;
import io.kirun.runtime.web.AbstractDataObjectController;
import io.kirun.runtime.web.model.PasswordChangeRequest;
import io.kirun.runtime.web.model.RuntimeResponse;

@RestController
@RequestMapping(UserController.MAPPING)
public class UserController extends AbstractDataObjectController<User, IUserRepository, UserService> {

	public static final String MAPPING = "/api/security/user";

	public static final String CHANGE_PASSWORD = "/changePassword";
	public static final String ACTIVATE_USER = "/activateUser";
	public static final String RESEND_ACTIVATION_MAIL = "/resendActivationMail";
	public static final String RESET_PASSWORD_MAIL = "/resetPasswordMail";
	public static final String RESET_PASSWORD = "/resetPassword";

	@Autowired
	private CaptchaService captchaService;

	@PostMapping(CHANGE_PASSWORD)
	public ResponseEntity<RuntimeResponse<Boolean>> changePassword(@RequestBody @Valid PasswordChangeRequest request) {

		return ResponseEntity.ok(new RuntimeResponse<Boolean>().setMessage("Password updated successfully").setData(
				this.service.changePassword(request.getUserId(), request.getOldPassword(), request.getNewPassword())));
	}

	@GetMapping(RESET_PASSWORD_MAIL)
	public ResponseEntity<RuntimeResponse<Boolean>> resetPasswordMail(@RequestParam String userId,
			@RequestParam String captcha, @RequestParam String captchaString) {

		captchaService.validate(captcha, captchaString);

		return ResponseEntity.ok(new RuntimeResponse<Boolean>().setMessage("Password reset mail sent")
				.setData(this.service.sendResetPasswordMail(userId)));
	}

	@GetMapping(RESET_PASSWORD)
	public ResponseEntity<RuntimeResponse<Boolean>> resetPassword(@RequestParam String userId,
			@RequestParam String password, @RequestParam String resetPasswordString, @RequestParam String captcha,
			@RequestParam String captchaString) {

		captchaService.validate(captcha, captchaString);
		return ResponseEntity.ok(new RuntimeResponse<Boolean>().setMessage("Password reset successfully")
				.setData(this.service.resetPassword(userId, password, resetPasswordString)));
	}

	@GetMapping(ACTIVATE_USER)
	public ResponseEntity<RuntimeResponse<Boolean>> activateUser(@RequestParam String userId,
			@RequestParam String activationCode, @RequestParam String captcha, @RequestParam String captchaString) {

		captchaService.validate(captcha, captchaString);
		return ResponseEntity.ok(new RuntimeResponse<Boolean>().setMessage("User activated")
				.setData(this.service.activateUser(userId, activationCode)));
	}

	@GetMapping(RESEND_ACTIVATION_MAIL)
	public ResponseEntity<RuntimeResponse<Boolean>> resendActivationMail(@RequestParam String userId,
			@RequestParam String captcha, @RequestParam String captchaString) {

		captchaService.validate(captcha, captchaString);
		this.service.resendActivationMail(userId);
		return ResponseEntity.ok(new RuntimeResponse<Boolean>().setData(true).setMessage("Email sent"));
	}
}
