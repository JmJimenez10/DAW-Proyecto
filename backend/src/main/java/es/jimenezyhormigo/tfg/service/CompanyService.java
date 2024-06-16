package es.jimenezyhormigo.tfg.service;

import java.util.List;

import es.jimenezyhormigo.tfg.dto.CompanyDto;

public interface CompanyService {
	
	CompanyDto createCompany(CompanyDto companyDto);
	
	CompanyDto getCompanyById(Long companyId);

	List<CompanyDto> getAllCompanies();

	CompanyDto updateCompany(Long companyId, CompanyDto updateCompany);

	void deleteCompany(Long companyId);

}
