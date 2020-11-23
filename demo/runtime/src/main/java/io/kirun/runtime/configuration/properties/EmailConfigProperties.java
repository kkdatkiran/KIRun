package io.kirun.runtime.configuration.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@ConfigurationProperties(prefix = "email")
@Data
public class EmailConfigProperties {

	private String host;
	private String port;
	private String username;
	private String password;
	private String testEmailTo;
	private String fromAddress;
}
