package io.kirun.runtime.security.model;

import java.io.Serializable;
import java.util.Date;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class Authentication implements Serializable {

	private static final long serialVersionUID = 5682429631616029825L;
	
	private String token;
	private Date expiresAt;
	private User user;
}
