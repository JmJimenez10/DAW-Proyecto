package es.jimenezyhormigo.tfg.mapper;

import es.jimenezyhormigo.tfg.dto.DocumentDataDto;
import es.jimenezyhormigo.tfg.entity.DocumentData;

public class DocumentDataMapper {
	
	public static DocumentDataDto mapToDocumentDataDto(DocumentData documentData) {
        DocumentDataDto documentDataDto = new DocumentDataDto();
        documentDataDto.setId(documentData.getId());
        documentDataDto.setName(documentData.getName());
        documentDataDto.setType(documentData.getType());
        documentDataDto.setCreatedBy(documentData.getCreatedBy());
        documentDataDto.setDocumentData(documentData.getDocumentData());
        documentDataDto.setCreationDate(documentData.getCreationDate());
        
        // Asignar el ID de la sección si la documentSection no es nula
        if (documentData.getDocumentSection() != null) {
            documentDataDto.setSectionId(documentData.getDocumentSection().getId());
        }
        
     // Asignar el ID de la sección si la documentSection no es nula
        if (documentData.getCompany() != null) {
            documentDataDto.setCompanyId(documentData.getCompany().getId());
        }
        
        return documentDataDto;
    }
    
    public static DocumentData mapToDocumentData(DocumentDataDto documentDataDto) {
        DocumentData documentData = new DocumentData();
        documentData.setId(documentDataDto.getId());
        documentData.setName(documentDataDto.getName());
        documentData.setType(documentDataDto.getType());
        documentData.setCreatedBy(documentDataDto.getCreatedBy());
        documentData.setDocumentData(documentDataDto.getDocumentData());
        documentData.setCreationDate(documentDataDto.getCreationDate());
        
        return documentData;
    }

}
