package io.kirun.runtime.util;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;

public class DateUtil {

	public static String timeStamp() {
		
		return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss SSS Z").format(Date.from(Instant.now()));
	}
	
	private DateUtil() {}
}
