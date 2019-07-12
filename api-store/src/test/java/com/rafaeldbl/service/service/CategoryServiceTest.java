package com.rafaeldbl.service.service;

import com.rafaeldbl.service.builder.CategoryBuilder;
import com.rafaeldbl.service.model.Category;
import com.rafaeldbl.service.repository.CategoryRepository;
import com.rafaeldbl.service.service.impl.CategoryService;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

public class CategoryServiceTest {


    @InjectMocks
    private CategoryService service;

    @Mock
    private CategoryRepository repository;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void shouldGetAllCategories() {
        List<Category> categories = CategoryBuilder.categoryList(5);

        when(repository.findAll()).thenReturn(categories);

        assertEquals(categories, service.getAll());
        assertEquals(5, service.getAll().size());
    }
}
