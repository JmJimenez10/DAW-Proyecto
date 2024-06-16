package es.jimenezyhormigo.tfg.dto;

import es.jimenezyhormigo.tfg.entity.Company;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ImageDataDto {
    private Long id;
    private String name;
    private String type;
    private byte[] imageData;
    private Company company;
}
