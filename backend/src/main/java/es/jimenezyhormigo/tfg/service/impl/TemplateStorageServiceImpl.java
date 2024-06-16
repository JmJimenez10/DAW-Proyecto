package es.jimenezyhormigo.tfg.service.impl;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import es.jimenezyhormigo.tfg.dto.TemplateDataDto;
import es.jimenezyhormigo.tfg.entity.TemplateData;
import es.jimenezyhormigo.tfg.entity.TemplateSection;
import es.jimenezyhormigo.tfg.exception.ResourceNotFoundException;
import es.jimenezyhormigo.tfg.mapper.TemplateDataMapper;
import es.jimenezyhormigo.tfg.repository.TemplateDataStorageRepository;
import es.jimenezyhormigo.tfg.repository.TemplateSectionRepository;
import es.jimenezyhormigo.tfg.utility.ImageUtils;

@Service
public class TemplateStorageServiceImpl {

	@Autowired
	private TemplateDataStorageRepository repository;
	
	@Autowired TemplateSectionRepository templateSectionRepository;

	public String uploadTemplate(MultipartFile file, Long sectionId) throws IOException {
		byte[] compressedDocument = ImageUtils.compressImage(file.getBytes());

		if (compressedDocument.length == 0) {
			throw new IOException("Failed to compress document");
		}

		TemplateData documentData = TemplateData.builder().name(file.getOriginalFilename()).type(file.getContentType())
				.documentData(compressedDocument).build();
		
		Optional<TemplateSection> optionalSection = templateSectionRepository.findById(sectionId);
		if (optionalSection.isPresent()) {
			TemplateSection templateSection = optionalSection.get();
			documentData.setTemplateSection(templateSection);
		} else {
            throw new ResourceNotFoundException("Template section not found with id: " + sectionId);
        }

		TemplateData savedTemplateData = repository.save(documentData);

		return file.getOriginalFilename();
	}
	
	public byte[] downloadTemplate(Long id) {
		Optional<TemplateData> templateFromDb = repository.findById(id);
		if (templateFromDb.isPresent()) {
			return ImageUtils.decompressImage(templateFromDb.get().getDocumentData());
		} else {
			throw new RuntimeException("Template not found with id: " + id);
		}
	}

	public void deleteTemplate(Long id) {
		TemplateData templateFromDb = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Template does not exists with given id : " + id));
	
		repository.deleteById(id);
	}

	public List<TemplateDataDto> getAllTemplates() {
		List<TemplateData> templates = repository.findAll();
		
		return templates.stream().map((template) -> TemplateDataMapper.mapToTemplateDataDto(template)).collect(Collectors.toList());
	}

}
