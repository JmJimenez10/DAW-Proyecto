package es.jimenezyhormigo.tfg.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDto {
	private Long id;
	private String message;
	private LocalDateTime creationDate;
	private LocalDateTime deleteDate;
}
