package es.jimenezyhormigo.tfg.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import es.jimenezyhormigo.tfg.entity.FinancialData;

public interface FinancialDataRepository extends JpaRepository<FinancialData, Long> {
	List<FinancialData> findByCompanyId(Long companyId);
}
