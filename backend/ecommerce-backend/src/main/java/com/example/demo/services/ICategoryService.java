package com.example.demo.services;

import java.util.List;

import com.example.demo.dto.category.CategoryDto;
import com.example.demo.dto.category.CreateCategoryDto;
import com.example.demo.dto.category.UpdateCategoryDto;

public interface ICategoryService {
    CategoryDto createCategory(CreateCategoryDto createCategoryDto);
    List<CategoryDto> getAllCategories();
    CategoryDto getCategoryById(Long id);
    CategoryDto updateCategory(Long id, UpdateCategoryDto updateCategoryDto);
    void deleteCategory(Long id);
}