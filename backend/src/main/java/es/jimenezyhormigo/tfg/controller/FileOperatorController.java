package es.jimenezyhormigo.tfg.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import es.jimenezyhormigo.tfg.dto.CompanyDto;
import es.jimenezyhormigo.tfg.service.CompanyService;
import es.jimenezyhormigo.tfg.service.impl.FileStorageService;
import lombok.AllArgsConstructor;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/images")
public class FileOperatorController {

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private CompanyService companyService;

    @PostMapping("/admin/{companyId}")
    public ResponseEntity<?> uploadImage(@PathVariable Long companyId, @RequestParam("image") MultipartFile file) throws IOException {
        // Verificar si la empresa existe
        CompanyDto companyDto = companyService.getCompanyById(companyId);
        
        // Asociar la imagen cargada con la empresa correspondiente
        String uploadImage = fileStorageService.uploadImage(file, companyId);

        return ResponseEntity.status(HttpStatus.OK).body(uploadImage);
    }

    @GetMapping("/adminuser/{id}")
    public ResponseEntity<?> downloadImage(@PathVariable Long id){
        byte[] imageInBytes = fileStorageService.downloadImage(id);

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png")).body(imageInBytes);
    }

    @DeleteMapping("/admin/{companyId}")
    public ResponseEntity<String> deleteImage(@PathVariable("companyId") Long companyId) {
        fileStorageService.deleteImageByCompanyId(companyId);
        return ResponseEntity.ok("Image deleted successfully");
    }


}
