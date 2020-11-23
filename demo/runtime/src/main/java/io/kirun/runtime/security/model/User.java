package io.kirun.runtime.security.model;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.annotation.Id;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import io.kirun.runtime.model.AbstractDataObject;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = true)
public class User extends AbstractDataObject implements UserDetails {

	private static final long serialVersionUID = -7122595771207045999L;

	private String firstName;
	private String lastName;

	@Id
	private String email;

	@JsonProperty(access = Access.WRITE_ONLY)
	private String activationString;
	
	@JsonIgnore
	private String resetPasswordString;

	private boolean enabled = true;
	private List<String> permissions;

	@JsonProperty(access = Access.WRITE_ONLY)
	private String password;
	
	@JsonIgnore
	private Integer wrongPasswordTries = 0;

	@JsonIgnore
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {

		if (permissions == null)
			return Collections.emptyList();

		return permissions.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
	}

	@Override
	public String getUsername() {
		return this.email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@JsonIgnore
	public String getId() {
		return this.email;
	}
}
