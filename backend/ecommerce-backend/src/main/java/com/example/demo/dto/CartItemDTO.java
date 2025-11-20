package com.example.demo.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItemDTO {
    private Long id;
    private Long productId;
    private String productName;
    private String productImageUrl;
    private Double productPrice;
    private Integer quantity;
    private Double subtotal;
}