package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderRequest {

    @NotBlank(message = "Shipping address is required")
    @Size(min = 10, max = 500, message = "Address must be between 10 and 500 characters")
    private String shippingAddress;
}