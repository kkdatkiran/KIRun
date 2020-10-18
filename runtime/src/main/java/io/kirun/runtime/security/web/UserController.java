package io.kirun.runtime.security.web;

import javax.validation.Valid;

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
import io.kirun.runtime.web.AbstractDataObjectController;
import io.kirun.runtime.web.RuntimeResponse;
import io.kirun.runtime.web.model.PasswordChangeRequest;

@RestController
@RequestMapping(UserController.MAPPING)
public class UserController extends AbstractDataObjectController<User, IUserRepository, UserService> {

	public static final String MAPPING = "/api/security/user";
	
	public static final String CHANGE_PASSWORD = "/changePassword";
	public static final String ACTIVATE_USER = "/activateUser";

	@PostMapping(CHANGE_PASSWORD)
	public ResponseEntity<RuntimeResponse<Boolean>> changePassword(@RequestBody @Valid PasswordChangeRequest request) {

		return ResponseEntity.ok(new RuntimeResponse<Boolean>().setMessage("Password updated successfully").setData(
				this.service.changePassword(request.getUserId(), request.getOldPassword(), request.getNewPassword())));
	}
	
	@GetMapping(ACTIVATE_USER)
	public ResponseEntity<RuntimeResponse<Boolean>> activateUser(@RequestParam String userId, @RequestParam String activationCode) {
		
		return ResponseEntity.ok(new RuntimeResponse<Boolean>().setMessage("User activated").setData(this.service.activateUser(userId, activationCode)));
	}
}
