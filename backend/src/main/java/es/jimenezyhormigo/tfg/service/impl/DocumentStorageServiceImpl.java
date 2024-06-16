package es.jimenezyhormigo.tfg.service.impl;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import es.jimenezyhormigo.tfg.dto.DocumentDataDto;
import es.jimenezyhormigo.tfg.entity.Company;
import es.jimenezyhormigo.tfg.entity.DocumentData;
import es.jimenezyhormigo.tfg.entity.DocumentSection;
import es.jimenezyhormigo.tfg.exception.ResourceNotFoundException;
import es.jimenezyhormigo.tfg.mapper.DocumentDataMapper;
import es.jimenezyhormigo.tfg.repository.CompanyRepository;
import es.jimenezyhormigo.tfg.repository.DocumentDataStorageRepository;
import es.jimenezyhormigo.tfg.repository.DocumentSectionRepository;
import es.jimenezyhormigo.tfg.utility.ImageUtils;

@Service
public class DocumentStorageServiceImpl {
	
	@Autowired
	private DocumentDataStorageRepository repository;
	
	@Autowired
	private DocumentSectionRepository documentSectionRepository;
	
	@Autowired
	private CompanyRepository companyRepository;
	
	public String uploadDocument(MultipartFile file, String createdBy, Long companyId, Long sectionId) throws IOException {
		byte[] compressedDocument = ImageUtils.compressImage(file.getBytes());

		if (compressedDocument.length == 0) {
			throw new IOException("Failed to compress document");
		}

		DocumentData documentData = DocumentData.builder().name(file.getOriginalFilename()).type(file.getContentType())
				.documentData(compressedDocument).build();
		
		Optional<DocumentSection> optionalSection = documentSectionRepository.findById(sectionId);
		if (optionalSection.isPresent()) {
			DocumentSection documentSection = optionalSection.get();
			documentData.setDocumentSection(documentSection);
		} else {
            throw new ResourceNotFoundException("Document section not found with id: " + sectionId);
        }
		
		documentData.setCreatedBy(createdBy);
		
		Optional<Company> optionalCompany = companyRepository.findById(companyId);
		if (optionalCompany.isPresent()) {
			Company documentCompany = optionalCompany.get();
			documentData.setCompany(documentCompany);
		} else {
            throw new ResourceNotFoundException("Company not found with id: " + companyId);
        }

		DocumentData savedDocumentData = repository.save(documentData);

		return file.getOriginalFilename();
    }
	
	public byte[] downloadDocument(Long id) {
		Optional<DocumentData> documentFromDb = repository.findById(id);
		if (documentFromDb.isPresent()) {
			return ImageUtils.decompressImage(documentFromDb.get().getDocumentData());
		} else {
			throw new RuntimeException("Document not found with id: " + id);
		}
	}
	
	public void deleteDocument(Long id) {
		DocumentData documentFromDb = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Document does not exists with given id : " + id));
	
		repository.deleteById(id);
	}

	public List<DocumentDataDto> getAllDocuments() {
		List<DocumentData> documents = repository.findAll();
		
		return documents.stream().map((document) -> DocumentDataMapper.mapToDocumentDataDto(document)).collect(Collectors.toList());
	}
	
	public List<DocumentDataDto> getDocumentsByCompanyId(Long companyId) {
		List<DocumentData> documents =  repository.findByCompanyId(companyId);
        
        return documents.stream().map((document) -> DocumentDataMapper.mapToDocumentDataDto(document)).collect(Collectors.toList());
    }
	
	public List<DocumentDataDto> getDocumentsByCompanyIdCreatedBy(Long companyId, String createdBy) {
		List<DocumentData> documents =  repository.findByCompanyIdAndCreatedBy(companyId, createdBy);
        
        return documents.stream().map((document) -> DocumentDataMapper.mapToDocumentDataDto(document)).collect(Collectors.toList());
    }
	

}
