package es.jimenezyhormigo.tfg.mapper;

import es.jimenezyhormigo.tfg.dto.ImageDataDto;
import es.jimenezyhormigo.tfg.entity.ImageData;

public class ImageDataMapper {

    public static ImageDataDto mapToImageDataDto(ImageData imageData) {
        return new ImageDataDto(
            imageData.getId(),
            imageData.getName(),
            imageData.getType(),
            imageData.getImageData(),
            imageData.getCompany()
        );
    }

    public static ImageData mapToImageData(ImageDataDto imageDataDto) {
        return new ImageData(
            imageDataDto.getId(),
            imageDataDto.getName(),
            imageDataDto.getType(),
            imageDataDto.getImageData(),
            imageDataDto.getCompany()
        );
    }
}
