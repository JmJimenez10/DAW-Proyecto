package es.jimenezyhormigo.tfg.mapper;

import es.jimenezyhormigo.tfg.dto.TemplateSectionDto;
import es.jimenezyhormigo.tfg.entity.TemplateSection;

public class TemplateSectionMapper {
	
	public static TemplateSectionDto mapToTemplateSectionDto(TemplateSection template) {
		TemplateSectionDto templateDto = new TemplateSectionDto(
				template.getId(),
	            template.getName(),
	            null
	        );
		
		return templateDto;
	}
	
	public static TemplateSection mapToTemplateSection(TemplateSectionDto templateDto) {
		TemplateSection template = new TemplateSection(
				templateDto.getId(),
				templateDto.getName(),
	            null
	        );
		
		return template;
	}

}
