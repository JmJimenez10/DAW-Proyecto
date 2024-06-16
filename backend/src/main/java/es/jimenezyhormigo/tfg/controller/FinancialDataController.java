package es.jimenezyhormigo.tfg.controller;

import es.jimenezyhormigo.tfg.dto.FinancialDataDto;
import es.jimenezyhormigo.tfg.entity.FinancialData;
import es.jimenezyhormigo.tfg.service.impl.FinancialDataServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/financial-data")
public class FinancialDataController {

    @Autowired
    private FinancialDataServiceImpl financialDataService;

    @GetMapping("/{id}")
    public ResponseEntity<FinancialDataDto> getFinancialDataById(@PathVariable Long id) {
        FinancialDataDto financialData = financialDataService.getFinancialDataById(id);
        return ResponseEntity.ok(financialData);
    }

    @GetMapping("/company/{companyId}")
    public ResponseEntity<List<FinancialDataDto>> getFinancialDataByCompanyId(@PathVariable Long companyId) {
        List<FinancialDataDto> financialDataList = financialDataService.getFinancialDataByCompanyId(companyId);
        return ResponseEntity.ok(financialDataList);
    }

    @PostMapping
    public ResponseEntity<FinancialData> createFinancialData(@RequestBody FinancialDataDto financialDataDto) {
        FinancialData createdFinancialData = financialDataService.createFinancialData(financialDataDto);
        return ResponseEntity.ok(createdFinancialData);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FinancialData> updateFinancialData(@PathVariable Long id, @RequestBody FinancialDataDto financialDataDto) {
        if (financialDataDto.getCompany() == null || financialDataDto.getCompany().getId() == null) {
            throw new IllegalArgumentException("Company information is required");
        }

        FinancialData updatedFinancialData = financialDataService.updateFinancialData(id, financialDataDto);
        return ResponseEntity.ok(updatedFinancialData);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFinancialData(@PathVariable Long id) {
        financialDataService.deleteFinancialData(id);
        return ResponseEntity.noContent().build();
    }
}
