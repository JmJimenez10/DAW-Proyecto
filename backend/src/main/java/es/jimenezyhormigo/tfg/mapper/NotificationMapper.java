package es.jimenezyhormigo.tfg.mapper;

import es.jimenezyhormigo.tfg.dto.NotificationDto;
import es.jimenezyhormigo.tfg.entity.Notification;

public class NotificationMapper {
	
	public static NotificationDto mapToNotificationDto(Notification notification) {
		return new NotificationDto(
				notification.getId(),
				notification.getMessage(),
				notification.getCreationDate(),
				notification.getDeleteDate()
				);
	}
	
	public static Notification mapToNotification(NotificationDto notificationDto) {
		return new Notification(
				notificationDto.getId(),
				notificationDto.getMessage(),
				notificationDto.getCreationDate(),
				notificationDto.getDeleteDate()
				);
	}

}
