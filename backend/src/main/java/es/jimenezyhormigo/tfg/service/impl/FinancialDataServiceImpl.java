package es.jimenezyhormigo.tfg.service.impl;

import es.jimenezyhormigo.tfg.dto.CompanyDto;
import es.jimenezyhormigo.tfg.dto.FinancialDataDto;
import es.jimenezyhormigo.tfg.entity.Company;
import es.jimenezyhormigo.tfg.entity.FinancialData;
import es.jimenezyhormigo.tfg.repository.CompanyRepository;
import es.jimenezyhormigo.tfg.repository.FinancialDataRepository;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class FinancialDataServiceImpl {

    @Autowired
    private FinancialDataRepository financialDataRepository;

    @Autowired
    private CompanyRepository companyRepository;

    public List<FinancialDataDto> getAllFinancialData() {
        return financialDataRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public FinancialDataDto getFinancialDataById(Long id) {
        Optional<FinancialData> optionalFinancialData = financialDataRepository.findById(id);
        if (optionalFinancialData.isPresent()) {
            return convertToDto(optionalFinancialData.get());
        } else {
            throw new RuntimeException("Financial data not found for id: " + id);
        }
    }

    public FinancialData createFinancialData(FinancialDataDto financialDataDto) {
        if (financialDataDto.getCompany() == null || financialDataDto.getCompany().getId() == null) {
            throw new IllegalArgumentException("Company information is required");
        }

        FinancialData financialData = new FinancialData();
        financialData.setQuarter(financialDataDto.getQuarter());
        financialData.setSales(financialDataDto.getSales());

        Optional<Company> company = companyRepository.findById(financialDataDto.getCompany().getId());
        if (company.isPresent()) {
            financialData.setCompany(company.get());
        } else {
            throw new RuntimeException("Company not found for id: " + financialDataDto.getCompany().getId());
        }

        return financialDataRepository.save(financialData);
    }


    public FinancialData updateFinancialData(Long id, FinancialDataDto financialDataDto) {
        Optional<FinancialData> optionalFinancialData = financialDataRepository.findById(id);
        if (optionalFinancialData.isPresent()) {
            FinancialData financialData = optionalFinancialData.get();
            financialData.setQuarter(financialDataDto.getQuarter());
            financialData.setSales(financialDataDto.getSales());

            Optional<Company> company = companyRepository.findById(financialDataDto.getCompany().getId());
            if (company.isPresent()) {
                financialData.setCompany(company.get());
            } else {
                throw new RuntimeException("Company not found for id: " + financialDataDto.getCompany().getId());
            }

            return financialDataRepository.save(financialData);
        } else {
            throw new RuntimeException("Financial data not found for id: " + id);
        }
    }

    public void deleteFinancialData(Long id) {
        Optional<FinancialData> optionalFinancialData = financialDataRepository.findById(id);
        if (optionalFinancialData.isPresent()) {
            financialDataRepository.delete(optionalFinancialData.get());
        } else {
            throw new RuntimeException("Financial data not found for id: " + id);
        }
    }

    public List<FinancialDataDto> getFinancialDataByCompanyId(Long companyId) {
        return financialDataRepository.findByCompanyId(companyId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private FinancialDataDto convertToDto(FinancialData financialData) {
        FinancialDataDto financialDataDto = new FinancialDataDto();
        financialDataDto.setId(financialData.getId());
        financialDataDto.setQuarter(financialData.getQuarter());
        financialDataDto.setSales(financialData.getSales());

        CompanyDto companyDto = new CompanyDto();
        companyDto.setId(financialData.getCompany().getId());
        companyDto.setCif(financialData.getCompany().getCif());
        companyDto.setName(financialData.getCompany().getName());

        financialDataDto.setCompany(companyDto);

        return financialDataDto;
    }
}
