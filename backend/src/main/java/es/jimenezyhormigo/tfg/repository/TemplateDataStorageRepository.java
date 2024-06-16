package es.jimenezyhormigo.tfg.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import es.jimenezyhormigo.tfg.entity.TemplateData;

public interface TemplateDataStorageRepository extends JpaRepository<TemplateData, Long> {

}
