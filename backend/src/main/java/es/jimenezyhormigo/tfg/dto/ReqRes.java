package es.jimenezyhormigo.tfg.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import es.jimenezyhormigo.tfg.entity.OurUser;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

// JsonInclude.Include.NON_NULL: solo se incluirán en la salida JSON aquellas propiedades que no sean nulas.
// @JsonIgnoreProperties(ignoreUnknown = true):  Indica que si el JSON de entrada contiene propiedades que no están mapeadas a campos en la clase Java, estas propiedades serán ignoradas y no causarán un error.
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class ReqRes {

    private int statusCode;
    private String error;
    private String message;
    private String token;
    private String refreshToken;
    private String expirationTime;
    
    private String dni;
	private String name;
	private String surnames;
	private String email;
	private String password;
	private String role;
	private boolean firstLogin;
	private boolean emailVerified;
	private boolean emailNotifications;
	private LocalDateTime creationDate;
	
    private OurUser ourUsers;
    private List<OurUser> ourUsersList;

}
