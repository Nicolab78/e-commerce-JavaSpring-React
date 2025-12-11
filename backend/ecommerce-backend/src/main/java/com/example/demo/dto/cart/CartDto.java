package com.example.demo.dto.cart;

import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CartDto {
    private Long id;
    private Long userId;
    private List<CartItemDto> items;
    private Double totalPrice;
}