package es.jimenezyhormigo.tfg.dto;

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
public class DocumentSectionDto {
	private Long id;
	private String name;
	private List<TemplateDataDto> documents;
	
	// Método para añadir un usuario a la lista
    public void addTemplate(TemplateDataDto document) {
        if (documents == null) {
        	documents = new ArrayList<>();
        }
        documents.add(document);
    }
}
