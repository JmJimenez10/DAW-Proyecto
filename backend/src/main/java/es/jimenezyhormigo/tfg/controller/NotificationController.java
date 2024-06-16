package es.jimenezyhormigo.tfg.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.jimenezyhormigo.tfg.dto.NotificationDto;
import es.jimenezyhormigo.tfg.service.NotificationService;
import lombok.AllArgsConstructor;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

	private NotificationService notificationService;

	@PostMapping
	public ResponseEntity<NotificationDto> createNotification(@RequestBody NotificationDto notificationDto) {
		NotificationDto savedNotification = notificationService.createNotification(notificationDto);
		return new ResponseEntity<>(savedNotification, HttpStatus.CREATED);
	}

	@GetMapping
	public ResponseEntity<List<NotificationDto>> getAllNotifications() {
		List<NotificationDto> notifications = notificationService.getAllNotifications();
		return ResponseEntity.ok(notifications);
	}

	@GetMapping("{id}")
	public ResponseEntity<NotificationDto> getNotificationById(@PathVariable("id") Long notificationId) {
		NotificationDto notificationDtoDto = notificationService.getNotificationById(notificationId);
		return ResponseEntity.ok(notificationDtoDto);
	}

	@DeleteMapping("{id}")
	public ResponseEntity<String> deleteNotification(@PathVariable("id") Long notificationId) {
		notificationService.deleteNotification(notificationId);
		return ResponseEntity.ok("Notification deleted successfully");
	}

}
