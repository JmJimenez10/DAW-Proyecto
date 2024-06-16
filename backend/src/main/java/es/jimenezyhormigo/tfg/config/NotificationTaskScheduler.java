package es.jimenezyhormigo.tfg.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import es.jimenezyhormigo.tfg.service.NotificationService;

@Configuration
@EnableScheduling
public class NotificationTaskScheduler {

    private final NotificationService notificationService;

    public NotificationTaskScheduler(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @Scheduled(cron = "0 * * * * *") // Ejecutar cada minuto
    public void deleteExpiredNotifications() {
        notificationService.deleteExpiredNotifications();
    }
}

