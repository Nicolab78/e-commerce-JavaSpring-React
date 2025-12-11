package com.example.demo.dto.product;

import lombok.Data;

@Data
public class CreateProductDto {
    private String name;
    private String description;
    private Double price;
    private Integer stockQuantity;
    private String imageUrl;
    private Long categoryId;
}