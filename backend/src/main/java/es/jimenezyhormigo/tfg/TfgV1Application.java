package es.jimenezyhormigo.tfg;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
// import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
// @ComponentScan("es.jimenezyhormigo.tfg")
public class TfgV1Application {

	public static void main(String[] args) {
		SpringApplication.run(TfgV1Application.class, args);
	}

}
