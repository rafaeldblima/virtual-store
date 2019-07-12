package com.rafaeldbl.service.builder;

import com.google.common.collect.ImmutableList;
import com.rafaeldbl.service.model.Category;

import java.util.List;

public class CategoryBuilder {

    private Category elemento;

    private CategoryBuilder() {
    }

    public static CategoryBuilder oneCategory() {
        return oneCategory(1L, "Category name");
    }

    public static List<Category> categoryList(int length) {
        List<Category> produtos = new java.util.ArrayList<>(ImmutableList.of());
        for (long i = 0; i < length; i++) {
            produtos.add(oneCategory(i, "Category" + i).now());
        }
        return produtos;
    }

    private static CategoryBuilder oneCategory(long id, String name) {
        CategoryBuilder builder = new CategoryBuilder();
        builder.elemento = new Category();
        Category category = builder.elemento;
        category.setId(id);
        category.setName(name);
        return builder;
    }

    public Category now() {
        return elemento;
    }
}
