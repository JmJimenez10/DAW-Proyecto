package es.jimenezyhormigo.tfg.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import es.jimenezyhormigo.tfg.dto.CompanyDto;
import es.jimenezyhormigo.tfg.entity.Company;
import es.jimenezyhormigo.tfg.exception.ResourceNotFoundException;
import es.jimenezyhormigo.tfg.mapper.CompanyMapper;
import es.jimenezyhormigo.tfg.repository.CompanyRepository;
import es.jimenezyhormigo.tfg.service.CompanyService;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CompanyServiceImpl implements CompanyService {
	
	private CompanyRepository companyRepository;

	@Override
	public CompanyDto createCompany(CompanyDto companyDto) {
		Company company = CompanyMapper.mapToCompany(companyDto);
		Company savedCompany = companyRepository.save(company);

		return CompanyMapper.mapToCompanyDto(savedCompany);
	}

	@Override
	public CompanyDto getCompanyById(Long companyId) {
		Company company = companyRepository.findById(companyId)
				.orElseThrow(() -> new ResourceNotFoundException("Company does not exists with given id: " + companyId));

		return CompanyMapper.mapToCompanyDto(company);
	}

	@Override
	public List<CompanyDto> getAllCompanies() {
		List<Company> companies = companyRepository.findAll();

		return companies.stream().map((company) -> CompanyMapper.mapToCompanyDto(company)).collect(Collectors.toList());
	}

	@Override
	public CompanyDto updateCompany(Long companyId, CompanyDto updateCompany) {
		Company company = companyRepository.findById(companyId)
				.orElseThrow(() -> new ResourceNotFoundException("Company does not exists with given id : " + companyId));
		
		company.setCif(updateCompany.getCif());
		company.setName(updateCompany.getName());
		company.setCreationDate(updateCompany.getCreationDate());
		
		Company updatedCompanyObj = companyRepository.save(company);
		
		return CompanyMapper.mapToCompanyDto(updatedCompanyObj);
	}

	@Override
	public void deleteCompany(Long companyId) {
		Company company = companyRepository.findById(companyId)
				.orElseThrow(() -> new ResourceNotFoundException("Company does not exists with given id : " + companyId));

		companyRepository.deleteById(companyId);
	}

}
