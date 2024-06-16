package es.jimenezyhormigo.tfg.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import es.jimenezyhormigo.tfg.dto.NotificationDto;
import es.jimenezyhormigo.tfg.entity.Notification;
import es.jimenezyhormigo.tfg.exception.ResourceNotFoundException;
import es.jimenezyhormigo.tfg.mapper.NotificationMapper;
import es.jimenezyhormigo.tfg.repository.NotificationRepository;
import es.jimenezyhormigo.tfg.service.NotificationService;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class NotificationServiceImpl implements NotificationService {
	
	private NotificationRepository notificationRepository;
	
	@Override
	public NotificationDto createNotification(NotificationDto notificationDto) {
		
		Notification notification = NotificationMapper.mapToNotification(notificationDto);
		Notification savedNotification = notificationRepository.save(notification);
		
		return NotificationMapper.mapToNotificationDto(savedNotification);
	}

	@Override
	public List<NotificationDto> getAllNotifications() {
		List<Notification> notifications = notificationRepository.findAll();

		return notifications.stream().map((notification) -> NotificationMapper.mapToNotificationDto(notification)).collect(Collectors.toList());

	}

	@Override
	public void deleteNotification(Long notificationId) {
		Notification notification = notificationRepository.findById(notificationId)
				.orElseThrow(() -> new ResourceNotFoundException("Notification does not exists with given id : " + notificationId));

		notificationRepository.deleteById(notificationId);
		
	}

	@Override
	public NotificationDto getNotificationById(Long notificationId) {
		Notification notification = notificationRepository.findById(notificationId)
				.orElseThrow(() -> new ResourceNotFoundException("Notification does not exists with given id: " + notificationId));
		return NotificationMapper.mapToNotificationDto(notification);
	}
	
	public void deleteExpiredNotifications() {
        LocalDateTime currentDateTime = LocalDateTime.now();
        List<Notification> expiredNotifications = notificationRepository.findByDeleteDateBefore(currentDateTime);
        notificationRepository.deleteAll(expiredNotifications);
    }

}
