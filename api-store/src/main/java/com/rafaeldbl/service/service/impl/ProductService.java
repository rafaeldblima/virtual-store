package com.rafaeldbl.service.service.impl;

import com.rafaeldbl.service.model.Product;
import com.rafaeldbl.service.repository.ProductRepository;
import com.rafaeldbl.service.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("ProductService")
public class ProductService extends GenericService<Product, Long> implements IProductService {

    @Autowired
    private ProductRepository repository;

    @Override
    public List<Product> getAllByCategoryId(long id) {
        return repository.findAllByCategoryId(id);
    }
}
