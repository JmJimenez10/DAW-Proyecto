package es.jimenezyhormigo.tfg.mapper;

import java.util.ArrayList;
import java.util.List;

import es.jimenezyhormigo.tfg.dto.CompanyDto;
import es.jimenezyhormigo.tfg.dto.ReqRes;
import es.jimenezyhormigo.tfg.entity.Company;
import es.jimenezyhormigo.tfg.entity.OurUser;

public class CompanyMapper {
    
    public static CompanyDto mapToCompanyDto(Company company) {
        CompanyDto companyDto = new CompanyDto(
            company.getId(),
            company.getCif(),
            company.getName(),
            company.getCreationDate(), null
        );
        
        // Mapeo de usuarios
        if (company.getUsers() != null && !company.getUsers().isEmpty()) {
            List<ReqRes> userDtos = new ArrayList<>();
            for (OurUser user : company.getUsers()) {
                userDtos.add(UserMapper.mapToUserDto(user));
            }
            companyDto.setUsers(userDtos);
        }
        return companyDto;
    }
    
    public static Company mapToCompany(CompanyDto companyDto) {
        Company company = new Company(
            companyDto.getId(),
            companyDto.getCif(),
            companyDto.getName(),
            companyDto.getCreationDate(),
            null, null, null, null
        );
        return company;
    }

}
