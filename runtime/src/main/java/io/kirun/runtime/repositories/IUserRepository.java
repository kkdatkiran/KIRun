package io.kirun.runtime.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import io.kirun.runtime.security.model.User;

@Repository
public interface IUserRepository extends MongoRepository<User, String> {

	Optional<User> findByEmail(String email);

	long count();
}
