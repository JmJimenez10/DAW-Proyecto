package es.jimenezyhormigo.tfg.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.jimenezyhormigo.tfg.dto.CompanyDto;
import es.jimenezyhormigo.tfg.dto.TemplateSectionDto;
import es.jimenezyhormigo.tfg.service.impl.TemplateSectionServiceImpl;
import lombok.AllArgsConstructor;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/templateSections")
public class TemplateSectionController {
	
	private TemplateSectionServiceImpl service;
	
	@PostMapping
	public ResponseEntity<TemplateSectionDto> createTemplateSection(@RequestBody TemplateSectionDto templateSectionDto) {
		TemplateSectionDto savedTemplateSection = service.createSection(templateSectionDto);
		return new ResponseEntity<>(savedTemplateSection, HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<List<TemplateSectionDto>> getAllTemplateSections() {
		List<TemplateSectionDto> templateSections = service.getAllTemplateSections();
		return ResponseEntity.ok(templateSections);
	}
	
	@GetMapping("{id}")
	public ResponseEntity<TemplateSectionDto> getTemplateSectionById(@PathVariable("id") Long templateSectionId) {
		TemplateSectionDto templateSectionDto = service.getTemplateSectionById(templateSectionId);
		return ResponseEntity.ok(templateSectionDto);
	}
	
	@PutMapping("{id}")
	public ResponseEntity<TemplateSectionDto> updateTemplateSection(@PathVariable("id") Long id,
			@RequestBody TemplateSectionDto updatedTemplateSection) {
		TemplateSectionDto templateSectionDto = service.updateTemplateSection(id, updatedTemplateSection);
		return ResponseEntity.ok(templateSectionDto);
	}

	@DeleteMapping("{id}")
	public ResponseEntity<String> deleteTemplateSection(@PathVariable("id") Long id) {
		service.deleteTemplateSection(id);
		return ResponseEntity.ok("Template section deleted successfully");
	}

}
