package com.example.demo.services;

import java.util.List;

import com.example.demo.entity.Product;

public interface IProductService {
	
	Product saveProduct(Product product);
	List<Product> getAllProducts();
	Product getProductById(Long id);
	Product updateProduct(Product product);
	void deleteProduct(Long id);
	List<Product> getProductsByCategory(Long categoryId);
    List<Product> getBestSellers(int limit);

}
