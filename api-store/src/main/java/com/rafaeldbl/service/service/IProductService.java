package com.rafaeldbl.service.service;

import com.rafaeldbl.service.model.Product;

import java.util.List;

public interface IProductService extends IGenericService<Product, Long> {
    List<Product> getAllByCategoryId(long id);
}
