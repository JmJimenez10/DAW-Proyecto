package es.jimenezyhormigo.tfg.service;

import java.util.List;

import es.jimenezyhormigo.tfg.dto.NotificationDto;

public interface NotificationService {
	
	NotificationDto createNotification(NotificationDto notificationDto);
	
	NotificationDto getNotificationById(Long notificationId);
	
	List<NotificationDto> getAllNotifications();
	
	void deleteNotification(Long notificationId);

	void deleteExpiredNotifications();

}
