package com.example.demo.dto.order;

import com.example.demo.dto.product.ProductDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderItemDto {
    private Long id;
    private ProductDto product;
    private Integer quantity;
    private Double price;
    private Double subtotal;
}