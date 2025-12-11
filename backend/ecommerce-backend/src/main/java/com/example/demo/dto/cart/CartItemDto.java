package com.example.demo.dto.cart;

import com.example.demo.dto.product.ProductDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CartItemDto {
    private Long id;
    private ProductDto product;
    private Integer quantity;
    private Double subtotal;
}