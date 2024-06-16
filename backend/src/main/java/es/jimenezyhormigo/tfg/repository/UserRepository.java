package es.jimenezyhormigo.tfg.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import es.jimenezyhormigo.tfg.entity.OurUser;

public interface UserRepository extends JpaRepository<OurUser, Long> {
	Optional<OurUser> findByEmail(String email);

	Optional<OurUser> findByDni(String dni);
	
	List<OurUser> findByEmailVerifiedTrueAndEmailNotificationsTrue();

	Optional<OurUser> findByEmailAndDni(String email, String dni);

	int countByRole(String string);
}
