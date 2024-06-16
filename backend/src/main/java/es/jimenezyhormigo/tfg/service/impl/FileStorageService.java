package es.jimenezyhormigo.tfg.service.impl;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.stereotype.Service;

import es.jimenezyhormigo.tfg.entity.Company;
import es.jimenezyhormigo.tfg.entity.ImageData;
import es.jimenezyhormigo.tfg.exception.ResourceNotFoundException;
import es.jimenezyhormigo.tfg.repository.CompanyRepository;
import es.jimenezyhormigo.tfg.repository.ImageDataStorageRepository;
import es.jimenezyhormigo.tfg.utility.ImageUtils;

@Service
public class FileStorageService {
    
    @Autowired
    private ImageDataStorageRepository imageDataStorageRepository;
    
    @Autowired
    private CompanyRepository companyRepository;

    public String uploadImage(MultipartFile file, Long companyId) throws IOException {
        byte[] compressedImage = ImageUtils.compressImage(file.getBytes());
        if (compressedImage.length == 0) {
            throw new IOException("Failed to compress image");
        }

        ImageData imageData = ImageData.builder()
            .name(file.getOriginalFilename())
            .type(file.getContentType())
            .imageData(compressedImage)
            .build();
        
        // Asociar la imagen con la empresa correspondiente
        Optional<Company> optionalCompany = companyRepository.findById(companyId);
        if (optionalCompany.isPresent()) {
            Company company = optionalCompany.get();
            imageData.setCompany(company);
        } else {
            throw new ResourceNotFoundException("Company not found with id: " + companyId);
        }

        ImageData savedImageData = imageDataStorageRepository.save(imageData);
        if (savedImageData == null || savedImageData.getId() == null) {
            throw new IOException("Failed to save image data in database");
        }

        return file.getOriginalFilename();
    }


    public byte[] downloadImage(Long id){
        Optional<ImageData> imageFromDb = imageDataStorageRepository.findByCompanyId(id);
        if (imageFromDb.isPresent()) {
            return ImageUtils.decompressImage(imageFromDb.get().getImageData());
        } else {
            throw new RuntimeException("Image not found with id: " + id);
        }
    }
    
    public void deleteImage(Long imageId) {
		ImageData imageFromDb = imageDataStorageRepository.findById(imageId)
				.orElseThrow(() -> new ResourceNotFoundException("Image does not exists with given id : " + imageId));

		imageDataStorageRepository.deleteById(imageId);

	}
    
    public void deleteImageByCompanyId(Long companyId) {
        Optional<Company> optionalCompany = companyRepository.findById(companyId);
        if (optionalCompany.isPresent()) {
            Company company = optionalCompany.get();
            Optional<ImageData> imageDataOptional = imageDataStorageRepository.findByCompanyId(company.getId());
            if (imageDataOptional.isPresent()) {
                imageDataStorageRepository.delete(imageDataOptional.get());
            } else {
                throw new ResourceNotFoundException("No image found for company with id: " + companyId);
            }
        } else {
            throw new ResourceNotFoundException("Company not found with id: " + companyId);
        }
    }



}

