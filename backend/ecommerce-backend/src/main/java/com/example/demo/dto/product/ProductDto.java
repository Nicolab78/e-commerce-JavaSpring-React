package com.example.demo.dto.product;

import com.example.demo.dto.category.CategoryDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductDto {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private Integer stockQuantity;
    private String imageUrl;
    private CategoryDto category;
}