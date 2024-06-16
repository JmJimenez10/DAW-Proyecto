package es.jimenezyhormigo.tfg.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import es.jimenezyhormigo.tfg.dto.DocumentSectionDto;
import es.jimenezyhormigo.tfg.entity.DocumentSection;
import es.jimenezyhormigo.tfg.exception.ResourceNotFoundException;
import es.jimenezyhormigo.tfg.mapper.DocumentSectionMapper;
import es.jimenezyhormigo.tfg.repository.DocumentSectionRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class DocumentSectionServiceImpl {
	
private DocumentSectionRepository repository;
	
	public DocumentSectionDto createSection(DocumentSectionDto documentSectionDto) {
		DocumentSection documentSection = DocumentSectionMapper.mapToDocumentSection(documentSectionDto);
		DocumentSection savedDocumentSection = repository.save(documentSection);

		return DocumentSectionMapper.mapToDocumentSectionDto(savedDocumentSection);
	}
	
	public DocumentSectionDto getDocumentSectionById(Long id) {
		DocumentSection documentSection = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Document section does not exists with given id: " + id));
	
		return DocumentSectionMapper.mapToDocumentSectionDto(documentSection);
	}
	
	public List<DocumentSectionDto> getAllDocumentSections() {
		List<DocumentSection> documentSections = repository.findAll();

		return documentSections.stream().map((documentSection) -> DocumentSectionMapper.mapToDocumentSectionDto(documentSection)).collect(Collectors.toList());
	}
	
	public DocumentSectionDto updateDocumentSection(Long documentSectionId, DocumentSectionDto updateDocumentSection) {
		DocumentSection documentSection = repository.findById(documentSectionId)
				.orElseThrow(() -> new ResourceNotFoundException("Document section does not exists with given id : " + documentSectionId));
		
		documentSection.setId(updateDocumentSection.getId());
		documentSection.setName(updateDocumentSection.getName());
		
		DocumentSection updatedDocumentSectionObj = repository.save(documentSection);
		
		return DocumentSectionMapper.mapToDocumentSectionDto(updatedDocumentSectionObj);
	}
	
	public void deleteDocumentSection(Long documentSectionId) {
		DocumentSection documentSection = repository.findById(documentSectionId)
				.orElseThrow(() -> new ResourceNotFoundException("Document does not exists with given id : " + documentSectionId));

		repository.deleteById(documentSectionId);
	}

}
