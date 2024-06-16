package es.jimenezyhormigo.tfg.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import es.jimenezyhormigo.tfg.entity.TemplateSection;

public interface TemplateSectionRepository extends JpaRepository<TemplateSection, Long> {
	Optional<TemplateSection> findById(Long id);
}
