package es.jimenezyhormigo.tfg.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import es.jimenezyhormigo.tfg.dto.CompanyDto;
import es.jimenezyhormigo.tfg.dto.TemplateSectionDto;
import es.jimenezyhormigo.tfg.entity.Company;
import es.jimenezyhormigo.tfg.entity.TemplateSection;
import es.jimenezyhormigo.tfg.exception.ResourceNotFoundException;
import es.jimenezyhormigo.tfg.mapper.CompanyMapper;
import es.jimenezyhormigo.tfg.mapper.TemplateSectionMapper;
import es.jimenezyhormigo.tfg.repository.TemplateSectionRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TemplateSectionServiceImpl {
	
	private TemplateSectionRepository repository;
	
	public TemplateSectionDto createSection(TemplateSectionDto templateSectionDto) {
		TemplateSection templateSection = TemplateSectionMapper.mapToTemplateSection(templateSectionDto);
		TemplateSection savedTemplateSection = repository.save(templateSection);

		return TemplateSectionMapper.mapToTemplateSectionDto(savedTemplateSection);
	}
	
	public TemplateSectionDto getTemplateSectionById(Long id) {
		TemplateSection templateSection = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Template section does not exists with given id: " + id));
	
		return TemplateSectionMapper.mapToTemplateSectionDto(templateSection);
	}
	
	public List<TemplateSectionDto> getAllTemplateSections() {
		List<TemplateSection> templateSections = repository.findAll();

		return templateSections.stream().map((templateSection) -> TemplateSectionMapper.mapToTemplateSectionDto(templateSection)).collect(Collectors.toList());
	}
	
	public TemplateSectionDto updateTemplateSection(Long templateSectionId, TemplateSectionDto updateTemplateSection) {
		TemplateSection templateSection = repository.findById(templateSectionId)
				.orElseThrow(() -> new ResourceNotFoundException("Template section does not exists with given id : " + templateSectionId));
		
		templateSection.setId(updateTemplateSection.getId());
		templateSection.setName(updateTemplateSection.getName());
		
		TemplateSection updatedTemplateSectionObj = repository.save(templateSection);
		
		return TemplateSectionMapper.mapToTemplateSectionDto(updatedTemplateSectionObj);
	}
	
	public void deleteTemplateSection(Long templateSectionId) {
		TemplateSection templateSection = repository.findById(templateSectionId)
				.orElseThrow(() -> new ResourceNotFoundException("Company does not exists with given id : " + templateSectionId));

		repository.deleteById(templateSectionId);
	}

}
