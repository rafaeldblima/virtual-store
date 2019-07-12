package com.rafaeldbl.service.controller;

import com.rafaeldbl.service.model.Category;
import com.rafaeldbl.service.service.impl.CategoryService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api(value = "Category Controller", description = "Endpoints para categoria.")
@RestController
@RequestMapping(path = "/api/category", produces = MediaType.APPLICATION_JSON_VALUE)
public class CategoryController {

    private final CategoryService service;

    @Autowired
    public CategoryController(CategoryService service) {
        this.service = service;
    }

    @RequestMapping(path = "", method = RequestMethod.GET)
    @ApiOperation("Busca todas as categorias.")
    public List<Category> getAllCategories() {
        return service.getAll();
    }
}
