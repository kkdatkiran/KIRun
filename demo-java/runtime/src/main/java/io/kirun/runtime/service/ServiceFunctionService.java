package io.kirun.runtime.service;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.support.PageableExecutionUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import io.kirun.engine.model.FunctionDefinition;
import io.kirun.engine.model.Statement;
import io.kirun.engine.model.StatementFlow;
import io.kirun.engine.model.StatementType;
import io.kirun.runtime.exception.DefaultRuntimeException;
import io.kirun.runtime.model.ServiceFunction;
import io.kirun.runtime.repositories.IServiceFunctionRepository;
import io.kirun.runtime.security.SecurityContextUtil;

@Service
public class ServiceFunctionService extends AbstractDataObjectService<IServiceFunctionRepository, ServiceFunction> {

	@Value("${servicefunctions.limit:10}")
	private Integer functionsLimit;

	@Override
	public ServiceFunction create(ServiceFunction dataObject) {

		String loggedInUserName = SecurityContextUtil.loggedInUsername();
		int m = this.repository.countByCreatedBy(loggedInUserName);
		if (m >= functionsLimit)
			throw new DefaultRuntimeException(HttpStatus.INSUFFICIENT_STORAGE,
					"Sorry limit reached : " + functionsLimit);

		return super.create(dataObject);
	}

	@Override
	public ServiceFunction update(ServiceFunction dataObject) {

		userAccessCheck(dataObject, "Unable to find the service function to update");
		return super.update(dataObject);
	}

	@Override
	public ServiceFunction read(String id) {

		ServiceFunction sf = super.read(id);
		this.userAccessCheck(sf, "Unable to find the service function");
		return sf;
	}

	@Override
	public Page<ServiceFunction> findByQuery(Pageable pageable, Map<String, Object> queryObject) {

		String loggedInUserName = SecurityContextUtil.loggedInUsername();
		int m = this.repository.countByCreatedBy(loggedInUserName);

		if (m == 0) {

			String startUUID = UUID.randomUUID().toString();
			String endUUID = UUID.randomUUID().toString();

			return PageableExecutionUtils.getPage(
					List.of(new ServiceFunction().setName("Untitled Service")
							.setDefinition(new FunctionDefinition()
									.setSteps(Map.of(startUUID, new Statement().setType(StatementType.START).setProperties(Map.of("x", 80, "y", 50)), endUUID,
											new Statement().setType(StatementType.END).setProperties(Map.of("x", 80, "y", 300))))
									.setFlow(Map.of(startUUID, new StatementFlow().setNext(endUUID))))),
					pageable, () -> 1);
		}

		queryObject.put("createdBy", loggedInUserName);
		return super.findByQuery(pageable, queryObject);
	}

	@Override
	public void delete(ServiceFunction dataObject) {
		userAccessCheck(dataObject, "Unable to find the service function to delete");
		super.delete(dataObject);
	}

	private void userAccessCheck(ServiceFunction dataObject, String message) {

		if (dataObject == null) {
			throw new DefaultRuntimeException("Unable to validate user access");
		}

		ServiceFunction sf = this.read(dataObject.getId());
		String loggedInUserName = SecurityContextUtil.loggedInUsername();
		if (sf == null || loggedInUserName == null || !loggedInUserName.equals(sf.getCreatedBy()))
			throw new DefaultRuntimeException(message);
	}
}
