package io.kirun.runtime.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import io.kirun.runtime.model.ServiceFunction;

@Repository
public interface IServiceFunctionRepository extends MongoRepository<ServiceFunction, String> {

	int countByCreatedBy(String createdBy);
}
