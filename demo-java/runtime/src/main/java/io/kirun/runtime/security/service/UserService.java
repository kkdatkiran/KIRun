package io.kirun.runtime.security.service;

import java.time.Instant;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.validation.Valid;

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
import io.kirun.runtime.service.MailService;

@Service
public class UserService extends AbstractDataObjectService<IUserRepository, User> {

	private static final String NO_USR_FOUND_WITH_EMAIL = "No user found with email : ";

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private MailService mailService;

	@Value("${jwt.tokenExpirationMin}")
	private Long expiration;

	@Value("${systemuser}")
	private String systemUser;

	@Value("${systempassword}")
	private String systemPassword;

	@Value("${maxwrongpasswords}")
	private Integer maxWrongPasswords;

	@PreAuthorize("hasAuthority('SUPER_USER')")
	@Override
	public User create(User inUser) {

		this.nullChecks(inUser);

		User dataObject = new User().setEmail(inUser.getEmail()).setEnabled(true).setFirstName(inUser.getFirstName())
				.setLastName(inUser.getLastName()).setPassword(inUser.getPassword().strip())
				.setPermissions(inUser.getPermissions());

		this.checkUniqueEmail(dataObject.getEmail());
		this.validate(dataObject);

		dataObject.setActivationString(new String(Base64.getEncoder().encode(passwordEncoder
				.encode(this.makePassword(dataObject.getUsername(), dataObject.getPassword())).getBytes())));
		dataObject.setPassword(
				passwordEncoder.encode(this.makePassword(dataObject.getUsername(), dataObject.getPassword())));
		User user = super.create(dataObject);

		mailService.userCreated(user);

		return user;
	}

	private void checkUniqueEmail(String email) {

		if (this.repository.findById(email).isEmpty())
			return;

		throw new DefaultRuntimeException(HttpStatus.CONFLICT, "Choose a different email address.");
	}

	@PreAuthorize("hasAuthority('SUPER_USER')")
	@Override
	public User update(User dataObject) {

		User user = this.read(dataObject.getUsername());
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

			User user = userOp.get();

			if (user.getWrongPasswordTries() >= maxWrongPasswords)
				throw new AuthException("Maximum password tries reached. Please reset your password.");

			if (passwordEncoder.matches(this.makePassword(userId, password), userOp.get().getPassword())) {

				if (user.getWrongPasswordTries() != 0) {
					user.setWrongPasswordTries(0);
					user = repository.save(user);
				}
				return user;
			} else {

				user.setWrongPasswordTries(user.getWrongPasswordTries() + 1);
				repository.save(user);
				return null;
			}
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

		return new User().setEmail(systemUser).setEnabled(true).setFirstName("Admin").setLastName("KIRun")
				.setPassword(systemPassword).setPermissions(List.of(SystemPermissions.SUPER_USER));
	}

	public boolean changePassword(String userId, String oldPassword, String newPassword) {

		String loggedInUser = SecurityContextUtil.loggedInUsername();

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

			if (!passwordEncoder.matches(this.makePassword(user.getUsername(), oldPassword), user.getPassword()))
				throw new DefaultRuntimeException(HttpStatus.FORBIDDEN, "Old password don't match.");
		}

		user.setPassword(passwordEncoder.encode(this.makePassword(user.getUsername(), newPassword)));
		this.update(user);

		return true;
	}

	public Boolean activateUser(String userId, String activationCode) {

		User user = this.read(userId);
		if (user == null)
			throw new NotFoundException("User not found : " + userId);

		if (user.getActivationString() == null || user.getActivationString().isEmpty())
			throw new DefaultRuntimeException(HttpStatus.GONE, "User is already active");

		if (!user.getActivationString().equals(activationCode))
			throw new DefaultRuntimeException(HttpStatus.FORBIDDEN, "Activation code don't match");

		user.setActivationString(null);
		super.update(user);

		return true;
	}

	public Boolean register(@Valid User user) {

		this.nullChecks(user);

		User cUser = new User().setEmail(user.getEmail().strip()).setEnabled(true)
				.setFirstName(user.getFirstName().strip()).setLastName(user.getLastName().strip())
				.setPassword(user.getPassword().strip());

		this.create(cUser);

		return true;
	}

	private void nullChecks(User user) {

		if (user.getPassword() == null)
			throw new DefaultRuntimeException(HttpStatus.BAD_REQUEST, "Password is required");

		if (user.getEmail() == null)
			throw new DefaultRuntimeException(HttpStatus.BAD_REQUEST, "Email is required");

		if (user.getFirstName() == null)
			throw new DefaultRuntimeException(HttpStatus.BAD_REQUEST, "First name is required");

		if (user.getLastName() == null)
			throw new DefaultRuntimeException(HttpStatus.BAD_REQUEST, "last name is required");
	}

	private void validate(User user) {

		if (user.getPassword().length() < 3 || user.getPassword().length() > 100)
			throw new DefaultRuntimeException(HttpStatus.BAD_REQUEST,
					"Password should be at least 3 characters long and should not exceed 100 characters");

		if (user.getEmail().length() < 3 || user.getEmail().length() > 100)
			throw new DefaultRuntimeException(HttpStatus.BAD_REQUEST,
					"Email should be at least 3 characters long and should not exceed 100 characters");

		if (user.getFirstName().length() < 3 || user.getFirstName().length() > 100)
			throw new DefaultRuntimeException(HttpStatus.BAD_REQUEST,
					"First name should be at least 3 characters long and should not exceed 100 characters");

		if (user.getLastName().length() < 3 || user.getLastName().length() > 100)
			throw new DefaultRuntimeException(HttpStatus.BAD_REQUEST,
					"Last name should be at least 3 characters long and should not exceed 100 characters");
	}

	public Boolean checkEmailIdExists(String email) {

		return this.repository.findById(email.strip()).isEmpty();
	}

	public void resendActivationMail(String userId) {

		User user = this.read(userId);

		if (user == null || user.getActivationString() == null)
			throw new DefaultRuntimeException(HttpStatus.NOT_FOUND,
					NO_USR_FOUND_WITH_EMAIL + userId + " needs activation.");

		this.mailService.userCreated(user);
	}

	public Boolean sendResetPasswordMail(String userId) {

		User user = this.read(userId);

		if (user == null || user.getActivationString() != null)
			throw new DefaultRuntimeException(HttpStatus.NOT_FOUND,
					NO_USR_FOUND_WITH_EMAIL + userId + " or needs activation.");

		user.setResetPasswordString(new String(Base64.getEncoder().encode(passwordEncoder
				.encode(user.getUsername() + user.getCreatedAt().toString() + Instant.now().toString()).getBytes())));

		this.repository.save(user);

		this.mailService.passwordReset(user);

		return true;
	}

	public Boolean resetPassword(String userId, String password, String resetPasswordString) {

		User user = this.read(userId);

		if (user == null || user.getActivationString() != null || user.getResetPasswordString() == null)
			throw new DefaultRuntimeException(HttpStatus.NOT_FOUND,
					NO_USR_FOUND_WITH_EMAIL + userId + " or needs activation or no reset password is requested.");

		if (!user.getResetPasswordString().equals(resetPasswordString))
			throw new DefaultRuntimeException(HttpStatus.FORBIDDEN,
					"The url used to reset is either old or doesn't belong to the user.");

		user.setWrongPasswordTries(0);
		user.setResetPasswordString(null);
		user.setPassword(passwordEncoder.encode(this.makePassword(user.getUsername(), password)));
		
		this.repository.save(user);
		
		return true;
	}
}
