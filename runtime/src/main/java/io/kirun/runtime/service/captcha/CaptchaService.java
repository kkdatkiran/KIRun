package io.kirun.runtime.service.captcha;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.font.FontRenderContext;
import java.awt.geom.Rectangle2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.util.Base64;
import java.util.Calendar;
import java.util.Collections;
import java.util.Map;
import java.util.WeakHashMap;
import java.util.concurrent.ThreadLocalRandom;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import io.kirun.runtime.exception.DefaultRuntimeException;

@Service
public class CaptchaService {

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Value("${captcha.length}")
	private Integer captchaLength;

	private Map<String, Boolean> alreadyUsed = Collections.synchronizedMap(new WeakHashMap<String, Boolean>());

	public Captcha generate(int width, int height) {

		String captcha = ThreadLocalRandom.current().ints(48, 123)
				.filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97)).limit(captchaLength)
				.collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append).toString();

		BufferedImage captchaImage = this.generateCaptchaImage(captcha, width, height);

		return new Captcha().setCaptchaImageURL(this.generateEncodedImage(captchaImage)).setCaptchaString(
				new String(Base64.getEncoder().encode(passwordEncoder.encode(captcha + today()).getBytes())));
	}

	public Boolean validate(String captcha, String captchaString) {

		if (alreadyUsed.containsKey(captchaString))
			throw new DefaultRuntimeException(HttpStatus.FORBIDDEN, "Invalid captcha string used.");

		boolean matched = passwordEncoder.matches(captcha + today(),
				new String(Base64.getDecoder().decode(captchaString)));

		if (!matched)
			throw new DefaultRuntimeException(HttpStatus.BAD_REQUEST, "Captcha is not verified.");

		alreadyUsed.put(captchaString, true);

		return true;
	}

	private String today() {

		Calendar in = Calendar.getInstance();
		return in.get(Calendar.DAY_OF_MONTH) + "-" + in.get(Calendar.MONTH) + "-" + in.get(Calendar.YEAR);
	}

	private String generateEncodedImage(BufferedImage captchaImage) {

		try (ByteArrayOutputStream bos = new ByteArrayOutputStream()) {
			ImageIO.write(captchaImage, "png", bos);
			return "data:image/png;base64," + new String(Base64.getEncoder().encode(bos.toByteArray()));
		} catch (Exception ex) {
			throw new DefaultRuntimeException("Unable to generate Captcha Image", ex);
		}
	}

	private BufferedImage generateCaptchaImage(String generatedString, int width, int height) {

		ThreadLocalRandom random = ThreadLocalRandom.current();

		Color fontColor = new Color(random.nextInt(256), random.nextInt(256), random.nextInt(256));
		Color backgroundColor = new Color(255 - fontColor.getRed(), 255 - fontColor.getGreen(),
				255 - fontColor.getBlue());

		BufferedImage bufferedImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
		Graphics2D graphics = bufferedImage.createGraphics();

		graphics.setColor(backgroundColor);
		graphics.fillRect(0, 0, width, height);

		Font f = new Font("Arial", Font.BOLD, 30);
		graphics.setFont(f);
		Rectangle2D rect = f.getStringBounds(generatedString, new FontRenderContext(null, true, false));
		int fontSize = (int) (width / rect.getWidth());
		fontSize -= (fontSize / 4);
		f = new Font("Arial", Font.BOLD, fontSize * 30);
		graphics.setFont(f);
		rect = f.getStringBounds(generatedString, new FontRenderContext(null, true, false));
		graphics.setRenderingHint(RenderingHints.KEY_TEXT_ANTIALIASING, RenderingHints.VALUE_TEXT_ANTIALIAS_LCD_HRGB);
		graphics.setColor(fontColor);
		graphics.drawString(generatedString, (int) (width - rect.getWidth()) / 2,
				(int) (((height - rect.getHeight()) / 2) + (rect.getHeight() * 3 / 4)));

		graphics.dispose();

		return bufferedImage;
	}
}
