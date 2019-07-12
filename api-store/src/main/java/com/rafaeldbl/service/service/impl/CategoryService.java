package com.rafaeldbl.service.service.impl;

import com.rafaeldbl.service.model.Category;
import com.rafaeldbl.service.repository.CategoryRepository;
import com.rafaeldbl.service.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("CategoryService")
public class CategoryService extends GenericService<Category, Long> implements ICategoryService {

    @Autowired
    private CategoryRepository repository;
}