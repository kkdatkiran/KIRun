package io.kirun.runtime.service;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

import javax.activation.DataHandler;
import javax.activation.URLDataSource;
import javax.mail.BodyPart;
import javax.mail.Message.RecipientType;
import javax.mail.Part;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import freemarker.core.ParseException;
import freemarker.template.Configuration;
import freemarker.template.MalformedTemplateNameException;
import freemarker.template.Template;
import freemarker.template.TemplateNotFoundException;
import io.kirun.runtime.configuration.properties.EmailConfigProperties;
import io.kirun.runtime.exception.DefaultRuntimeException;
import io.kirun.runtime.model.SendMailRequest;
import io.kirun.runtime.security.model.User;
import io.kirun.runtime.util.DateUtil;

@Service
public class MailService {

	public static final String SEND_TASK_EXECUTOR = "sendMailTaskExecutor";

	private static final Logger logger = LoggerFactory.getLogger(MailService.class);

	private static final String TEMPLATE_TEST_MAIL = "testMail";
	private static final String USER_CREATED_MAIL = "userCreatedMail";
	private static final String PASSWORD_RESET_MAIL = "passwordResetMail";

	@Autowired
	private JavaMailSender mailer;

	@Autowired
	private Configuration freemarkerConfig;

	@Autowired
	private EmailConfigProperties emailConfig;

	@Value("${url.prefix}")
	private String urlPrefix;

	@Async(SEND_TASK_EXECUTOR)
	public CompletableFuture<Boolean> sendMail(SendMailRequest request) {

		String messageBody;
		logger.debug("{} sending to : {}", request.getTemplateName(), request.getTo());

		if (request.getTo() == null || request.getTo().isBlank())
			throw new DefaultRuntimeException(HttpStatus.INTERNAL_SERVER_ERROR,
					"Trying to send " + request.getTemplateName() + " template to an empty address.");

		try {

			Template template = freemarkerConfig.getTemplate(request.getTemplateName() + ".ftl");
			messageBody = FreeMarkerTemplateUtils.processTemplateIntoString(template, request.getParameters());
		} catch (TemplateNotFoundException ex) {

			throw new DefaultRuntimeException("Template not found : " + request.getTemplateName(), ex);
		} catch (MalformedTemplateNameException ex) {

			throw new DefaultRuntimeException("Template is not formed : " + request.getTemplateName(), ex);
		} catch (ParseException ex) {

			throw new DefaultRuntimeException("Template not parsed : " + request.getTemplateName(), ex);
		} catch (Exception ex) {

			throw new DefaultRuntimeException(
					"Unable to send the mail with the template name : " + request.getTemplateName(), ex);
		}

		try {

			MimeMultipart multipart = new MimeMultipart();

			BodyPart messagePart = new MimeBodyPart();
			messagePart.setContent(messageBody, "text/html; charset=utf-8");
			multipart.addBodyPart(messagePart);

			messagePart = new MimeBodyPart();
			messagePart.setDataHandler(new DataHandler(new URLDataSource(
					Thread.currentThread().getContextClassLoader().getResource("emailImages/logo.png"))));
			messagePart.setHeader("Content-ID", "<logo>");
			messagePart.setFileName("logo.png");
			messagePart.setDisposition(Part.INLINE);
			multipart.addBodyPart(messagePart);

			messagePart = new MimeBodyPart();
			messagePart.setDataHandler(new DataHandler(new URLDataSource(
					Thread.currentThread().getContextClassLoader().getResource("emailImages/kirun.png"))));
			messagePart.setHeader("Content-ID", "<kirun>");
			messagePart.setFileName("kirun.png");
			messagePart.setDisposition(Part.INLINE);
			multipart.addBodyPart(messagePart);

			MimeMessage message = mailer.createMimeMessage();
			message.setSubject(request.getSubject());
			message.setFrom(emailConfig.getFromAddress());
			message.setRecipients(RecipientType.TO, request.getTo());
			message.setContent(multipart);

			logger.debug("{} mail body build to send to : {}", request.getTemplateName(), request.getTo());
			mailer.send(message);
			logger.debug("{} mail sent to : {}", request.getTemplateName(), request.getTo());
			return CompletableFuture.completedFuture(true);
		} catch (Exception ex) {

			throw new DefaultRuntimeException(
					"Unable to send the mail with the template name : " + request.getTemplateName(), ex);
		}
	}

	@PreAuthorize("hasAuthority('SUPER_USER')")
	public void testMailService() {

		((MailService) AopContext.currentProxy()).sendMail(new SendMailRequest().setTemplateName(TEMPLATE_TEST_MAIL)
				.setParameters(new HashMap<>(Map.of("param", "value from param")))
				.setSubject("Test mail sent at : " + DateUtil.timeStamp()).setTo(emailConfig.getTestEmailTo()));
	}

	public void userCreated(User user) {

		((MailService) AopContext.currentProxy()).sendMail(new SendMailRequest().setTemplateName(USER_CREATED_MAIL)
				.setParameters(new HashMap<>(Map.of("user", user, "urlPrefix", urlPrefix)))
				.setSubject("Verify email address and activate user for KIRun").setTo(user.getEmail()));
	}

	public void passwordReset(User user) {
		
		((MailService) AopContext.currentProxy()).sendMail(new SendMailRequest().setTemplateName(PASSWORD_RESET_MAIL)
				.setParameters(new HashMap<>(Map.of("user", user, "urlPrefix", urlPrefix)))
				.setSubject("Reset password for KIRun").setTo(user.getEmail()));
	}

}
