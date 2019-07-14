package com.rafaeldbl.service.service.impl;

import com.rafaeldbl.service.model.Product;
import com.rafaeldbl.service.repository.ProductRepository;
import com.rafaeldbl.service.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
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

    @Override
    public Page<Product> getAllPaginated(int page, int count, Sort.Direction direction, String sortProperty, String name, String description) {
        Product product = new Product();
        product.setDescription(description);
        product.setName(name);
        ExampleMatcher matcher = ExampleMatcher.matching().withIgnoreCase().withIgnoreNullValues()
                .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING).withIgnorePaths("id");
        Example<Product> example = Example.of(product, matcher);

        return repository.findAll(example, PageRequest.of(page, count, new Sort(direction, sortProperty)));
    }
}
