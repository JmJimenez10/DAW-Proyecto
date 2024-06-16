package es.jimenezyhormigo.tfg.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import es.jimenezyhormigo.tfg.entity.OurUser;
import es.jimenezyhormigo.tfg.repository.UserRepository;

import java.time.LocalDateTime;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.countByRole("ADMIN") == 0) {
            OurUser admin = new OurUser();
            admin.setName("Admin");
            admin.setSurnames("Administrator");
            admin.setEmail("admin@example.com");
            admin.setPassword(passwordEncoder.encode("admin"));
            admin.setRole("ADMIN");
            admin.setFirstLogin(false);
            admin.setEmailVerified(false);
            admin.setEmailNotifications(false);
            admin.setCreationDate(LocalDateTime.now());
            userRepository.save(admin);
        }
    }
}
