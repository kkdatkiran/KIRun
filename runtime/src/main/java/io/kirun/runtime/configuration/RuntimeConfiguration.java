package io.kirun.runtime.configuration;

import java.util.Properties;
import java.util.concurrent.Executor;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.util.StdDateFormat;

import io.kirun.runtime.configuration.properties.EmailConfigProperties;
import io.kirun.runtime.service.MailService;

@Configuration
@EnableAutoConfiguration
public class RuntimeConfiguration {

	@Autowired
	private ObjectMapper objectMapper;

	@Autowired
	private freemarker.template.Configuration freemarkerConfig;

	@PostConstruct
	public void initialize() {
		this.objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
		this.objectMapper.setDefaultPropertyInclusion(JsonInclude.Value.construct(Include.NON_NULL, Include.ALWAYS));
		this.objectMapper.setDefaultPropertyInclusion(JsonInclude.Value.construct(Include.NON_EMPTY, Include.ALWAYS));
		this.objectMapper.setDateFormat(new StdDateFormat());

		this.freemarkerConfig.setClassForTemplateLoading(this.getClass(), "/emailTemplates");
	}

	@Bean
	public MongoTemplate mongoTemplate(MongoDatabaseFactory databaseFactory, MappingMongoConverter converter) {
		return new MongoTemplate(databaseFactory, converter);
	}

	@Bean(name = MailService.SEND_TASK_EXECUTOR)
	public Executor sendMailTaskExecutor() {

		ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
		executor.setCorePoolSize(5);
		executor.setMaxPoolSize(5);
		executor.setQueueCapacity(500);
		executor.setThreadNamePrefix("MailPool-");
		executor.initialize();

		return executor;
	}

	@Bean
	public Executor getAsyncExecutor() {

		ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
		executor.setCorePoolSize(3);
		executor.setMaxPoolSize(3);
		executor.setQueueCapacity(300);
		executor.setThreadNamePrefix("GeneralPool-");
		executor.initialize();

		return executor;
	}

	@Bean
	public JavaMailSender getMailSender(EmailConfigProperties mailConfig) {

		JavaMailSenderImpl mailer = new JavaMailSenderImpl();

		mailer.setHost(mailConfig.getHost());
		mailer.setPort(Integer.parseInt(mailConfig.getPort()));
		mailer.setUsername(mailConfig.getUsername());
		mailer.setPassword(mailConfig.getPassword());

		Properties mailProps = new Properties();
		mailProps.put("mail.smtp.starttls.enable", "true");
		mailProps.put("mail.smtp.auth", "true");
		mailProps.put("mail.transport.protocol", "smtp");
		mailProps.put("mail.debug", "true");

		mailer.setJavaMailProperties(mailProps);

		return mailer;
	}
}
