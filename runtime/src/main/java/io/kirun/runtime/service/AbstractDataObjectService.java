package io.kirun.runtime.service;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.GenericTypeResolver;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.support.PageableExecutionUtils;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

import io.kirun.runtime.exception.NotFoundException;
import io.kirun.runtime.model.AbstractDataObject;
import io.kirun.runtime.security.SecurityContextUtil;

public class AbstractDataObjectService<R extends MongoRepository<D, String>, D extends AbstractDataObject> {

	@Autowired
	protected MongoOperations operations;

	@Autowired
	protected R repository;

	protected final Logger logger;

	private Class<D> entityType;

	@SuppressWarnings("unchecked")
	public AbstractDataObjectService() {
		super();
		Class<?>[] classArray = GenericTypeResolver.resolveTypeArguments(getClass(), AbstractDataObjectService.class);
		this.entityType = (Class<D>) classArray[1];
		this.logger = LoggerFactory.getLogger(this.getClass());
	}

	public D create(@NonNull D dataObject) {

		Date now = Date.from(Instant.now());
		dataObject.setCreatedAt(now);
		dataObject.setUpdatedAt(now);

		String userId = SecurityContextUtil.loggedInUserId();
		dataObject.setCreatedBy(userId);
		dataObject.setUpdatedBy(userId);

		return repository.insert(dataObject);
	}

	public void delete(@NonNull D dataObject) {
		repository.delete(dataObject);
	}

	public void deleteById(@NonNull String id) {
		repository.deleteById(id);
	}

	@Nullable
	public D read(@NonNull String id) {
		return repository.findById(id).orElse(null);
	}

	public Page<D> findByQuery(Pageable pageable, Map<String, Object> queryObject) {

		queryObject.remove("page");
		queryObject.remove("size");
		queryObject.remove("sort");

		Query query = new Query();
		List<Criteria> criteria = queryObject.entrySet().stream()
				.map(e -> Criteria.where(e.getKey()).regex(e.getValue().toString(), "i")).collect(Collectors.toList());

		query.addCriteria(new Criteria().andOperator(criteria.toArray(new Criteria[0]))).with(pageable);
		List<D> result = operations.find(query, this.entityType);

		return PageableExecutionUtils.getPage(result, pageable, () -> operations.count(query, this.entityType));
	}

	public D update(@NonNull D dataObject) {

		D obj = this.read(dataObject.getId());
		if (obj == null)
			throw new NotFoundException("Unable to find the object with id : " + dataObject.getId());

		dataObject.setCreatedAt(dataObject.getCreatedAt());
		dataObject.setCreatedBy(dataObject.getCreatedBy());
		dataObject.setUpdatedAt(Date.from(Instant.now()));
		String currentUser = SecurityContextUtil.loggedInUserId();
		dataObject.setUpdatedBy(currentUser == null ? "anonymous" : currentUser);

		return repository.save(dataObject);
	}
}
