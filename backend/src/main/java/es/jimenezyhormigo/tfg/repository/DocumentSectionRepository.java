package es.jimenezyhormigo.tfg.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import es.jimenezyhormigo.tfg.entity.DocumentSection;

public interface DocumentSectionRepository extends JpaRepository<DocumentSection, Long> {
	Optional<DocumentSection> findById(Long id);
}
