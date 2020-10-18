package io.kirun.runtime.security;

import org.springframework.lang.Nullable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import io.kirun.runtime.security.model.User;

public class SecurityContextUtil {

	@Nullable
	public static String loggedInUserId() {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication == null)
			return null;

		if (!authentication.isAuthenticated() || !(authentication.getPrincipal() instanceof User))
			return null;

		return ((User) authentication.getPrincipal()).getUserId();
	}

	public static boolean isSuperAdmin() {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication == null)
			return false;

		if (!authentication.isAuthenticated() || !(authentication.getPrincipal() instanceof User))
			return false;
		
		return ((User) authentication.getPrincipal()).getPermissions().contains("SUPER_ADMIN");
	}

	private SecurityContextUtil() {
	}
}
