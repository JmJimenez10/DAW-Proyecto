package es.jimenezyhormigo.tfg.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import es.jimenezyhormigo.tfg.entity.ImageData;

@Repository
public interface ImageDataStorageRepository extends JpaRepository<ImageData, Long> {

	Optional<ImageData> findByName(String fileName);
	
	Optional<ImageData> findByCompanyId(Long companyId);
	
}
