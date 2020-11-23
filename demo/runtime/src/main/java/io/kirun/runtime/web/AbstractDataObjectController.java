package io.kirun.runtime.web;

import java.util.Map;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.fasterxml.jackson.databind.ObjectMapper;

import io.kirun.runtime.exception.NotFoundException;
import io.kirun.runtime.model.AbstractDataObject;
import io.kirun.runtime.service.AbstractDataObjectService;
import io.kirun.runtime.web.model.RuntimeResponse;

public class AbstractDataObjectController<D extends AbstractDataObject, R extends MongoRepository<D, String>, S extends AbstractDataObjectService<R, D>> {

	public static final String PATH_VARIABLE_ID = "id";

	public static final String PATH_ID = "/{" + PATH_VARIABLE_ID + "}";

	protected final Logger logger;

	@Autowired
	protected ObjectMapper objectMapper;

	@Autowired
	protected S service;

	@Value("${defaultPageSize:15}")
	private Integer defaultPageSize;

	public AbstractDataObjectController() {

		this.logger = LoggerFactory.getLogger(this.getClass());
	}

	@PostMapping
	public ResponseEntity<RuntimeResponse<D>> create(@Valid @RequestBody D dataObject) {

		return ResponseEntity.ok(new RuntimeResponse<D>().setData(service.create(dataObject)));
	}

	@PutMapping
	public ResponseEntity<RuntimeResponse<D>> update(@Valid @RequestBody D dataObject) {

		return ResponseEntity.ok(new RuntimeResponse<D>().setData(service.update(dataObject)));
	}

	@GetMapping()
	public ResponseEntity<RuntimeResponse<PageImpl<D>>> findBy(Pageable pageable,
			@RequestParam(required = false) Map<String, Object> by) {

		Pageable target = (pageable == null ? PageRequest.of(0, defaultPageSize) : pageable);
		return ResponseEntity.ok(new RuntimeResponse<PageImpl<D>>().setData((PageImpl<D>) service.findByQuery(target, by)));
	}

	@GetMapping(PATH_ID)
	public ResponseEntity<RuntimeResponse<D>> getById(@PathVariable(PATH_VARIABLE_ID) String id) {

		D obj = this.service.read(id);

		if (obj == null)
			throw new NotFoundException("No object found with id : " + id);

		return ResponseEntity.ok(new RuntimeResponse<D>().setData(obj));
	}

	@DeleteMapping(PATH_ID)
	@ResponseStatus(value = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable(PATH_VARIABLE_ID) String id) {

		this.service.deleteById(id);
	}
}
