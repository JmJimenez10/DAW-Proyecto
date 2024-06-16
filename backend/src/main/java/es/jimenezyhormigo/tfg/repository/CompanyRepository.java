package es.jimenezyhormigo.tfg.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import es.jimenezyhormigo.tfg.entity.Company;
import es.jimenezyhormigo.tfg.entity.ImageData;

public interface CompanyRepository extends JpaRepository<Company, Long> {
	Optional<Company> findById(Long id);

	Optional<Company> findByCif(String cif);
}
