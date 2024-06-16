package es.jimenezyhormigo.tfg.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CompanyDto {
	private Long id;
	private String cif;
	private String name;
	private LocalDateTime creationDate;
	private List<ReqRes> users;
	
	// Método para añadir un usuario a la lista
    public void addUser(ReqRes user) {
        if (users == null) {
            users = new ArrayList<>();
        }
        users.add(user);
    }
}
