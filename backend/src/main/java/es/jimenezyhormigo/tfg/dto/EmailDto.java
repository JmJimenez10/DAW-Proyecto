package es.jimenezyhormigo.tfg.dto;

import lombok.Data;

@Data
public class EmailDto {
	
	private String mailTo;
	private String name;
	private String subject;
	private String message;
	private String temporalUrl = "";

}
