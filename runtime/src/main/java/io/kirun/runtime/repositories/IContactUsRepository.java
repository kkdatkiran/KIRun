package io.kirun.runtime.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import io.kirun.runtime.model.ContactUs;

@Repository
public interface IContactUsRepository extends MongoRepository<ContactUs, String> {

}
