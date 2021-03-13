package io.kirun.runtime.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import io.kirun.runtime.model.ServiceFunction;
import io.kirun.runtime.repositories.IServiceFunctionRepository;
import io.kirun.runtime.service.ServiceFunctionService;

@Controller
@RequestMapping(ServiceFunctionController.MAPPING)
public class ServiceFunctionController extends AbstractDataObjectController<ServiceFunction, IServiceFunctionRepository, ServiceFunctionService>{

	public static final String MAPPING = "/api/function";
}
