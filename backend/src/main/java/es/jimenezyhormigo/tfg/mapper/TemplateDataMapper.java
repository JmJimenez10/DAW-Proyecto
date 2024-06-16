package es.jimenezyhormigo.tfg.mapper;

import es.jimenezyhormigo.tfg.dto.TemplateDataDto;
import es.jimenezyhormigo.tfg.entity.TemplateData;

public class TemplateDataMapper {
    
    public static TemplateDataDto mapToTemplateDataDto(TemplateData templateData) {
        TemplateDataDto templateDataDto = new TemplateDataDto();
        templateDataDto.setId(templateData.getId());
        templateDataDto.setName(templateData.getName());
        templateDataDto.setType(templateData.getType());
        templateDataDto.setSection(templateData.getSection());
        templateDataDto.setDocumentData(templateData.getDocumentData());
        templateDataDto.setCreationDate(templateData.getCreationDate());
        
        // Asignar el ID de la sección si la templateSection no es nula
        if (templateData.getTemplateSection() != null) {
            templateDataDto.setSectionId(templateData.getTemplateSection().getId());
        }
        
        return templateDataDto;
    }
    
    public static TemplateData mapToTemplateData(TemplateDataDto templateDataDto) {
        TemplateData templateData = new TemplateData();
        templateData.setId(templateDataDto.getId());
        templateData.setName(templateDataDto.getName());
        templateData.setType(templateDataDto.getType());
        templateData.setSection(templateDataDto.getSection());
        templateData.setDocumentData(templateDataDto.getDocumentData());
        templateData.setCreationDate(templateDataDto.getCreationDate());
        
        return templateData;
    }
}
