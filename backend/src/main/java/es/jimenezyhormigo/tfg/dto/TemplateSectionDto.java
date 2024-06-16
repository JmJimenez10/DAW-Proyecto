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
public class TemplateSectionDto {
	private Long id;
	private String name;
	private List<TemplateDataDto> templates;
	
	// Método para añadir un usuario a la lista
    public void addTemplate(TemplateDataDto template) {
        if (templates == null) {
        	templates = new ArrayList<>();
        }
        templates.add(template);
    }
}
