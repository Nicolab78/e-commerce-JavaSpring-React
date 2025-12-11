package com.example.demo.dto.cart;

import lombok.Data;

@Data
public class AddToCartDto {
    private Long productId;
    private Integer quantity;
}