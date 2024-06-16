package es.jimenezyhormigo.tfg.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import es.jimenezyhormigo.tfg.dto.TemplateDataDto;
import es.jimenezyhormigo.tfg.service.impl.TemplateStorageServiceImpl;
import lombok.AllArgsConstructor;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/templates")
public class TemplateController {

	@Autowired
	private TemplateStorageServiceImpl service;
	
	@PostMapping("/{sectionId}")
	public ResponseEntity<?> uploadTemplate(@RequestParam("template") MultipartFile file, @PathVariable Long sectionId) throws IOException {
        
        String uploadTemplate = service.uploadTemplate(file, sectionId);

        return ResponseEntity.status(HttpStatus.OK).body(uploadTemplate);
    }
	
	@GetMapping
	public ResponseEntity<List<TemplateDataDto>> getAllTemplates() {
		List<TemplateDataDto> templates = service.getAllTemplates();
		return ResponseEntity.ok(templates);
	}
	
	@GetMapping("/{id}")
    public ResponseEntity<?> downloadTemplate(@PathVariable Long id){
        byte[] templateInBytes = service.downloadTemplate(id);

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("document/pdf")).body(templateInBytes);
    }
	
	@DeleteMapping("{id}")
 	public ResponseEntity<String> deleteTemplate(@PathVariable("id") Long templateId) {
 		service.deleteTemplate(templateId);
 		return ResponseEntity.ok("Template deleted successfully");
 	}
}
