package com.example.demo.dto.product;

import lombok.Data;

@Data
public class UpdateProductDto {
    private String name;
    private String description;
    private Double price;
    private Integer stockQuantity;
    private String imageUrl;
    private Long categoryId;
}