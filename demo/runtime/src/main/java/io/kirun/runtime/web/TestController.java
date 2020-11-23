package io.kirun.runtime.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.kirun.runtime.service.MailService;

@RestController
@RequestMapping(TestController.MAPPING)
public class TestController {

	public static final String MAPPING = "/api/test";

	public static final String TEST_MAIL = "/mail";

	@Autowired
	private MailService mailService;

	@GetMapping(TEST_MAIL)
	@ResponseStatus(value = HttpStatus.NO_CONTENT)
	public void testMailSending() {

		mailService.testMailService();
	}
}
