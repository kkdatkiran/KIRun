package io.kirun.runtime.security.service;

import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.lang.Nullable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import io.kirun.runtime.exception.DefaultRuntimeException;
import io.kirun.runtime.exception.NotFoundException;
import io.kirun.runtime.repositories.IUserRepository;
import io.kirun.runtime.security.AuthException;
import io.kirun.runtime.security.SecurityContextUtil;
import io.kirun.runtime.security.model.SystemPermissions;
import io.kirun.runtime.security.model.User;
import io.kirun.runtime.service.AbstractDataObjectService;

@Service
public class UserService extends AbstractDataObjectService<IUserRepository, User> {

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Value("${jwt.tokenExpirationMin}")
	private Long expiration;

	@Value("${systemuser}")
	private String systemUser;

	@Value("${systempassword}")
	private String systemPassword;

	@PreAuthorize("hasAuthority('SUPER_USER')")
	@Override
	public User create(User dataObject) {

		this.checkUniqueId(dataObject.getUserId());
		this.checkUniqueEmail(dataObject.getEmail());

		dataObject.setActivationString(new String(Base64.getEncoder().encode(passwordEncoder
				.encode(this.makePassword(dataObject.getUserId(), dataObject.getPassword())).getBytes())));
		dataObject.setPassword(
				passwordEncoder.encode(this.makePassword(dataObject.getUserId(), dataObject.getPassword())));
		return super.create(dataObject);
	}

	private void checkUniqueEmail(String email) {

		if (this.repository.findByEmail(email).isEmpty())
			return;

		throw new DefaultRuntimeException(HttpStatus.CONFLICT, "Choose a different email address.");
	}

	private void checkUniqueId(String userId) {

		if (this.repository.findById(userId).isEmpty())
			return;

		throw new DefaultRuntimeException(HttpStatus.CONFLICT, "User id taken.");
	}

	@PreAuthorize("hasAuthority('SUPER_USER')")
	@Override
	public User update(User dataObject) {

		User user = this.read(dataObject.getUserId());
		user.setFirstName(dataObject.getFirstName());
		user.setLastName(dataObject.getLastName());

		return super.update(user);
	}

	@PreAuthorize("hasAuthority('SUPER_USER')")
	@Override
	public Page<User> findByQuery(Pageable pageable, Map<String, Object> queryObject) {
		return super.findByQuery(pageable, queryObject);
	}

	@PreAuthorize("hasAuthority('SUPER_USER')")
	@Override
	public User read(String id) {
		return super.read(id);
	}

	@PreAuthorize("hasAuthority('SUPER_USER')")
	@Override
	public void deleteById(String id) {
		super.deleteById(id);
	}

	@Nullable
	public User findByUserId(String userId) {

		Optional<User> user = repository.findById(userId);

		if (user.isPresent()) {
			
			if (user.get().getActivationString() != null)
				throw new AuthException("User is not active. Please activate with the link provided in email.");
			
			return user.get();
		}

		if (!userId.equals(systemUser) || repository.count() != 0l)
			return null;

		return this.makeSystemUser();
	}

	@Nullable
	public User findByUserIdPassword(String userId, String password) {

		Optional<User> userOp = repository.findById(userId);

		if (userOp.isPresent()) {
			
			if (userOp.get().getActivationString() != null)
				throw new AuthException("User is not active. Please activate with the link provided in email.");
			
			if (passwordEncoder.matches(this.makePassword(userId, password), userOp.get().getPassword()))
				return userOp.get();
			else
				return null;
		}

		if (!userId.equals(systemUser) || repository.count() != 0l)
			return null;

		if (!password.equals(systemPassword))
			return null;

		return this.makeSystemUser();
	}

	private String makePassword(String userId, String password) {

		return userId + ":" + password;
	}

	private User makeSystemUser() {

		return new User().setEmail(systemUser + "@kirun.io").setEnabled(true).setFirstName("Admin").setLastName("KIRun")
				.setPassword(systemPassword).setUserId(systemUser)
				.setPermissions(List.of(SystemPermissions.SUPER_USER));
	}

	public boolean changePassword(String userId, String oldPassword, String newPassword) {

		String loggedInUser = SecurityContextUtil.loggedInUserId();

		if (loggedInUser == null)
			throw new DefaultRuntimeException(HttpStatus.FORBIDDEN, "Unauthorized access");

		User user;

		if (SecurityContextUtil.isSuperAdmin() && !loggedInUser.equals(userId)) {

			if (userId == null)
				throw new DefaultRuntimeException(HttpStatus.BAD_REQUEST,
						"User id is not provided to reset the password");

			user = this.read(userId);

			if (user == null)
				throw new DefaultRuntimeException(HttpStatus.NOT_FOUND, "User : " + userId + " not found.");

		} else {

			user = this.read(loggedInUser);

			if (!passwordEncoder.matches(this.makePassword(user.getUserId(), oldPassword), user.getPassword()))
				throw new DefaultRuntimeException(HttpStatus.FORBIDDEN, "Old password don't match.");
		}

		user.setPassword(passwordEncoder.encode(this.makePassword(user.getUserId(), newPassword)));
		this.update(user);

		return true;
	}

	public Boolean activateUser(String userId, String activationCode) {
		
		User user = this.read(userId);
		if (user == null)
			throw new NotFoundException("User not found : "+userId);
		
		if (user.getActivationString() == null || user.getActivationString().isEmpty())
			throw new DefaultRuntimeException(HttpStatus.GONE, "User is already active");
		
		if (!user.getActivationString().equals(activationCode))
			throw new DefaultRuntimeException(HttpStatus.FORBIDDEN, "Activation code don't match");
		
		user.setActivationString(null);
		super.update(user);
		
		return true;
	}
}
