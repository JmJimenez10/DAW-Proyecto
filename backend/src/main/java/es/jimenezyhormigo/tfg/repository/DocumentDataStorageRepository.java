package es.jimenezyhormigo.tfg.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import es.jimenezyhormigo.tfg.entity.DocumentData;

public interface DocumentDataStorageRepository extends JpaRepository<DocumentData, Long> {

	List<DocumentData> findByCompanyId(Long companyId);

	List<DocumentData> findByCompanyIdAndCreatedBy(Long companyId, String createdBy);


}
