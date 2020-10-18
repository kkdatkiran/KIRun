package io.kirun.runtime.service;

import java.util.concurrent.CompletableFuture;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class MailService {
	
	public static final String SEND_TASK_EXECUTOR = "sendMailTaskExecutor";

	@Async(SEND_TASK_EXECUTOR)
	public void sendMail() throws InterruptedException {
		
	}
}
