package com.example.demo.services;

import java.util.List;

import com.example.demo.dto.product.CreateProductDto;
import com.example.demo.dto.product.ProductDto;
import com.example.demo.dto.product.UpdateProductDto;

public interface IProductService {
    ProductDto createProduct(CreateProductDto createProductDto);
    List<ProductDto> getAllProducts();
    ProductDto getProductById(Long id);
    ProductDto updateProduct(Long id, UpdateProductDto updateProductDto);
    void deleteProduct(Long id);
    List<ProductDto> getProductsByCategory(Long categoryId);
    List<ProductDto> getBestSellers(int limit);
}