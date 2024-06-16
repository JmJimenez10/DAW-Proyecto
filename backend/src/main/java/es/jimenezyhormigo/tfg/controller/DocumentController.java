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

import es.jimenezyhormigo.tfg.dto.DocumentDataDto;
import es.jimenezyhormigo.tfg.service.impl.DocumentStorageServiceImpl;
import lombok.AllArgsConstructor;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/documents")
public class DocumentController {

	@Autowired
	private DocumentStorageServiceImpl service;

	@PostMapping("/adminuser/{createdBy}/{companyId}/{sectionId}")
	public ResponseEntity<?> uploadDocument(@RequestParam("document") MultipartFile file, @PathVariable String createdBy,
			@PathVariable Long companyId, @PathVariable Long sectionId) throws IOException {

		String uploadDocument = service.uploadDocument(file, createdBy, companyId, sectionId);

		return ResponseEntity.status(HttpStatus.OK).body(uploadDocument);
	}

	@GetMapping("/admin")
	public ResponseEntity<List<DocumentDataDto>> getAllDocuments() {
		List<DocumentDataDto> documents = service.getAllDocuments();
		return ResponseEntity.ok(documents);
	}

	@GetMapping("/adminuser/{id}")
	public ResponseEntity<?> downloadDocument(@PathVariable Long id) {
		byte[] documentInBytes = service.downloadDocument(id);

		return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf("document/pdf"))
				.body(documentInBytes);
	}
	
	@GetMapping("/adminuser/company/{id}")
	public ResponseEntity<?> getDocumentsByCompanyId(@PathVariable Long id) {
		List<DocumentDataDto> documents = service.getDocumentsByCompanyId(id);

		return ResponseEntity.ok(documents);
	}
	
	@GetMapping("/adminuser/company/{id}/createdBy/{createdBy}")
	public ResponseEntity<?> getDocumentsByCompanyIdCreatedBy(@PathVariable Long id, @PathVariable String createdBy) {
		List<DocumentDataDto> documents = service.getDocumentsByCompanyIdCreatedBy(id, createdBy);

		return ResponseEntity.ok(documents);
	}

	@DeleteMapping("/adminuser/{id}")
	public ResponseEntity<String> deleteDocument(@PathVariable("id") Long documentId) {
		service.deleteDocument(documentId);
		return ResponseEntity.ok("Document deleted successfully");
	}

}
