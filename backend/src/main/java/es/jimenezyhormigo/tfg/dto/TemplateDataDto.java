package es.jimenezyhormigo.tfg.dto;

import java.time.LocalDateTime;

import es.jimenezyhormigo.tfg.entity.TemplateSection;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TemplateDataDto {
    private Long id;
    private String name;
    private String type;
    private String section;
    private byte[] documentData;
    private LocalDateTime creationDate;
    private Long sectionId;

    // Constructor adicional para facilitar la creación del DTO
    public TemplateDataDto(Long id, String name, String type, String section, byte[] documentData, LocalDateTime creationDate, TemplateSection templateSection) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.section = section;
        this.documentData = documentData;
        this.creationDate = creationDate;
        if (templateSection != null) {
            this.sectionId = templateSection.getId();  // Asigna el ID de la sección si está presente
        }
    }
}

