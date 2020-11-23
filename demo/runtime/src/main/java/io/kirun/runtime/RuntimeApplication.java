package io.kirun.runtime;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@ComponentScan({ "io.kirun.*" })
@EnableMongoRepositories(basePackages = "io.kirun.*")
@EnableAsync
@EnableAspectJAutoProxy(exposeProxy = true)
public class RuntimeApplication {

	public static void main(String[] args) {
		SpringApplication.run(RuntimeApplication.class, args);
	}

}
