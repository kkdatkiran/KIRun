package io.kirun.runtime.configuration;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import io.kirun.runtime.security.AuthenticationFilter;
import io.kirun.runtime.security.AuthenticationProvider;
import io.kirun.runtime.security.RuntimeAuthenticationFailureHandler;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, proxyTargetClass = true)
public class RuntimeSecurityConfiguration extends WebSecurityConfigurerAdapter {

	@Autowired
	private AuthenticationProvider provider;
	
	@Autowired
	private RuntimeAuthenticationFailureHandler authenticationFailureHandler;

	@Override
	@Bean
	public AuthenticationManager authenticationManager() {
		return new ProviderManager(Collections.singletonList(provider));
	}

	public AuthenticationFilter authenticationFilter() {
		AuthenticationFilter filter = new AuthenticationFilter();
		filter.setAuthenticationManager(this.authenticationManager());
		filter.setAuthenticationFailureHandler(authenticationFailureHandler);
		filter.setAuthenticationSuccessHandler((rq, rs, a) -> {
		});
		return filter;
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {

		http.csrf().disable().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
				.authorizeRequests().antMatchers(HttpMethod.OPTIONS).permitAll().antMatchers("/**").permitAll()
				.anyRequest().fullyAuthenticated().and()
				.addFilterBefore(this.authenticationFilter(), UsernamePasswordAuthenticationFilter.class)
				.exceptionHandling();
	}

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
