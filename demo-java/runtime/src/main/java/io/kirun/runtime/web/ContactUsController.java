package io.kirun.runtime.web;

import java.util.Map;

import javax.validation.Valid;
import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.kirun.runtime.model.ContactUs;
import io.kirun.runtime.service.ContactUsService;
import io.kirun.runtime.service.captcha.CaptchaService;
import io.kirun.runtime.web.model.ContactUsRequest;
import io.kirun.runtime.web.model.RuntimeResponse;

@RequestMapping(ContactUsController.MAPPING)
@RestController
public class ContactUsController {

	public static final String MAPPING = "/api/contactUs";
	
	public static final String MARK_READ = "/markRead/{id}";	
	public static final String LIST = "/list";
	
	@Value("${defaultPageSize:15}")
	private Integer defaultPageSize;
	
	@Autowired
	private ContactUsService service;
	
	@Autowired
	private CaptchaService captchaService;
	
	@PostMapping
	public ResponseEntity<RuntimeResponse<Boolean>> contactUs(@RequestBody @Valid ContactUsRequest contactUsRequest) {

		captchaService.validate(contactUsRequest.getCaptcha(), contactUsRequest.getCaptchaString());
		service.addContactUsRequest(contactUsRequest.getContactUs());
		return ResponseEntity.ok(new RuntimeResponse<Boolean>().setData(true).setMessage("Thank you for your interest and will get back to you."));
	}
	
	@GetMapping(MARK_READ)
	public ResponseEntity<RuntimeResponse<Boolean>> markAsRead(@PathParam(value = "id") String id) {
		
		service.markReplied(id);
		return ResponseEntity.ok(new RuntimeResponse<Boolean>().setData(true).setMessage("Marked as replied."));
	}
	
	@GetMapping(LIST)
	public ResponseEntity<RuntimeResponse<PageImpl<ContactUs>>> findBy(Pageable pageable,
			@RequestParam(required = false) Map<String, Object> by) {

		Pageable target = (pageable == null ? PageRequest.of(0, defaultPageSize) : pageable);
		return ResponseEntity.ok(new RuntimeResponse<PageImpl<ContactUs>>().setData((PageImpl<ContactUs>) service.findByQuery(target, by)));
	}
}
