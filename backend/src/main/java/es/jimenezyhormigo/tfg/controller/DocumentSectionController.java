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

import es.jimenezyhormigo.tfg.dto.DocumentSectionDto;
import es.jimenezyhormigo.tfg.service.impl.DocumentSectionServiceImpl;
import lombok.AllArgsConstructor;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/documentSections")
public class DocumentSectionController {
	
	private DocumentSectionServiceImpl service;
	
	@PostMapping("/admin")
	public ResponseEntity<DocumentSectionDto> createDocumentSection(@RequestBody DocumentSectionDto documentSectionDto) {
		DocumentSectionDto savedDocumentSection = service.createSection(documentSectionDto);
		return new ResponseEntity<>(savedDocumentSection, HttpStatus.CREATED);
	}
	
	@GetMapping("/adminuser")
	public ResponseEntity<List<DocumentSectionDto>> getAllDocumentSections() {
		List<DocumentSectionDto> documentSections = service.getAllDocumentSections();
		return ResponseEntity.ok(documentSections);
	}
	
	@GetMapping("/adminuser/{id}")
	public ResponseEntity<DocumentSectionDto> getDocumentSectionById(@PathVariable("id") Long documentSectionId) {
		DocumentSectionDto documentSectionDto = service.getDocumentSectionById(documentSectionId);
		return ResponseEntity.ok(documentSectionDto);
	}
	
	@PutMapping("/admin/{id}")
	public ResponseEntity<DocumentSectionDto> updateDocumentSection(@PathVariable("id") Long id,
			@RequestBody DocumentSectionDto updatedDocumentSection) {
		DocumentSectionDto documentSectionDto = service.updateDocumentSection(id, updatedDocumentSection);
		return ResponseEntity.ok(documentSectionDto);
	}

	@DeleteMapping("/admin/{id}")
	public ResponseEntity<String> deleteDocumentSection(@PathVariable("id") Long id) {
		service.deleteDocumentSection(id);
		return ResponseEntity.ok("Document section deleted successfully");
	}

}
