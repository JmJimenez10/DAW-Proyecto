package es.jimenezyhormigo.tfg.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class FinancialDataDto {
	
	private Long id;
	private LocalDate quarter;
	private Double sales;
	private CompanyDto company;

}
