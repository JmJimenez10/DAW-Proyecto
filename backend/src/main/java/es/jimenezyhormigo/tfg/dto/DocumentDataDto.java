package es.jimenezyhormigo.tfg.dto;

import java.time.LocalDateTime;

import es.jimenezyhormigo.tfg.entity.Company;
import es.jimenezyhormigo.tfg.entity.DocumentSection;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DocumentDataDto {
	
	private Long id;
	private String name;
	private String type;
	private String createdBy;
	private byte[] documentData;
    private Long companyId;
    private LocalDateTime creationDate;
    private Long sectionId;
    
    public DocumentDataDto(Long id, String name, String type, String createdBy, byte[] documentData, Company company, LocalDateTime creationDate, DocumentSection documentSection) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.createdBy = createdBy;
        this.documentData = documentData;
        if (company != null) {
            this.sectionId = company.getId();  // Asigna el ID de la empresa si está presente
        }
        this.creationDate = creationDate;
        if (documentSection != null) {
            this.sectionId = documentSection.getId();  // Asigna el ID de la sección si está presente
        }
    }

}
