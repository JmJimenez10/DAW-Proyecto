package es.jimenezyhormigo.tfg.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import es.jimenezyhormigo.tfg.entity.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

	List<Notification> findByDeleteDateBefore(LocalDateTime currentDateTime);

}
