package io.kirun.runtime.security.web;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.kirun.runtime.security.model.Authentication;
import io.kirun.runtime.security.model.AuthenticationRequest;
import io.kirun.runtime.security.service.AuthenticationService;
import io.kirun.runtime.web.model.RuntimeResponse;

@RestController
@RequestMapping(SecurityController.MAPPING)
public class SecurityController {

	public static final String MAPPING = "/api/security";
	
	public static final String AUTHENTICATE = "/authenticate";
	public static final String REFRESH_AUTHENTICATION = "/refreshAuthentication";

	@Autowired
	private AuthenticationService authService;

	@PostMapping(AUTHENTICATE)
	public ResponseEntity<RuntimeResponse<Authentication>> authenticateUser(
			@RequestBody @Valid AuthenticationRequest authRequest) {

		return ResponseEntity.ok(new RuntimeResponse<Authentication>().setData(authService.authenticate(authRequest)));
	}

	@PostMapping(REFRESH_AUTHENTICATION)
	public ResponseEntity<RuntimeResponse<Authentication>> refreshAuthentication(HttpServletRequest request) {

		String authToken = request.getHeader("Authorization");
		return ResponseEntity
				.ok(new RuntimeResponse<Authentication>().setData(authService.refreshAuthentication(authToken)));
	}
}
