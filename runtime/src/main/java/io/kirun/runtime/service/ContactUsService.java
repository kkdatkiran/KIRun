package io.kirun.runtime.service;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import io.kirun.runtime.model.ContactUs;
import io.kirun.runtime.repositories.IContactUsRepository;

@Service
public class ContactUsService extends AbstractDataObjectService<IContactUsRepository, ContactUs>{

	public void addContactUsRequest(ContactUs contactUs) {

		contactUs.setReplied(false);
		this.create(contactUs);
	}
	
	@PreAuthorize("hasAuthority('SUPER_USER')")
	public void markReplied(String id) {
		
		ContactUs contactUs = repository.findById(id).orElseGet(() -> null);
		if (contactUs == null) return;
		contactUs.setReplied(true);
		this.update(contactUs);
	}		
}
