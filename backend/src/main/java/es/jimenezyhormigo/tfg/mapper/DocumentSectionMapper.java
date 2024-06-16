package es.jimenezyhormigo.tfg.mapper;

import es.jimenezyhormigo.tfg.dto.DocumentSectionDto;
import es.jimenezyhormigo.tfg.entity.DocumentSection;

public class DocumentSectionMapper {
	
	public static DocumentSectionDto mapToDocumentSectionDto(DocumentSection document) {
		DocumentSectionDto documentDto = new DocumentSectionDto(
				document.getId(),
				document.getName(),
	            null
	        );
		
		return documentDto;
	}
	
	public static DocumentSection mapToDocumentSection(DocumentSectionDto documentDto) {
		DocumentSection document = new DocumentSection(
				documentDto.getId(),
				documentDto.getName(),
	            null
	        );
		
		return document;
	}

}
