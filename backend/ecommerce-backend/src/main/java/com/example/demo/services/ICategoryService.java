package com.example.demo.services;

import java.util.List;

import com.example.demo.entity.Category;

public interface ICategoryService {
	
	Category saveCategory(Category category);
	List<Category> getAllCategories();
	Category getCategoryById(Long id);
	Category updateCategory(Category category);
	void deleteCategory(Long id);

}
