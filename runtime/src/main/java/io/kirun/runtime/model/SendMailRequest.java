package io.kirun.runtime.model;

import java.io.Serializable;
import java.util.Map;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class SendMailRequest implements Serializable {

	private static final long serialVersionUID = -8802869528414898389L;

	private String templateName;
	private String subject;
	private String to;
	private Serializable parameters;
	private Map<String, String> inlineAttachments;
}
