package io.kirun.runtime.security;

import java.io.IOException;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import io.kirun.runtime.security.web.SecurityController;
import io.kirun.runtime.security.web.UserController;
import io.kirun.runtime.web.CaptchaController;
import io.kirun.runtime.web.ContactUsController;
import io.kirun.runtime.web.RegistrationController;

public class AuthenticationFilter extends AbstractAuthenticationProcessingFilter {

	private static final Logger localLogger = LoggerFactory.getLogger(AuthenticationFilter.class);

	private static final List<String> EXCLUDED_URLS = List.of(
			SecurityController.MAPPING + SecurityController.AUTHENTICATE,
			SecurityController.MAPPING + SecurityController.REFRESH_AUTHENTICATION,
			UserController.MAPPING + UserController.RESEND_ACTIVATION_MAIL,
			UserController.MAPPING + UserController.ACTIVATE_USER,
			UserController.MAPPING + UserController.RESET_PASSWORD_MAIL,
			UserController.MAPPING + UserController.RESET_PASSWORD, RegistrationController.MAPPING,
			ContactUsController.MAPPING, CaptchaController.MAPPING, "/error");

	public AuthenticationFilter() {
		super("/**");
	}

	@Override
	protected boolean requiresAuthentication(HttpServletRequest request, HttpServletResponse response) {

		String url = request.getRequestURI();

		boolean flag = EXCLUDED_URLS.stream().anyMatch(e -> (new AntPathRequestMatcher(e)).matches(request));
		if (flag) {

			localLogger.debug("Requires authentication: {} - false", url);
			return false;
		}

		flag = url.indexOf("/api/") != -1;
		localLogger.debug("Requires authentication: {} - {}", url, flag);
		return flag;
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws IOException, ServletException {

		String auth = request.getHeader("Authorization");

		if (auth == null)
			throw AuthException.AUTH_MISSING;

		return getAuthenticationManager().authenticate(new AuthenticationToken(auth));
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {
		super.successfulAuthentication(request, response, chain, authResult);
		chain.doFilter(request, response);
	}

}
