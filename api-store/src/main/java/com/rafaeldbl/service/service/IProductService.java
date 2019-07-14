package com.rafaeldbl.service.service;

import com.rafaeldbl.service.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;

import java.util.List;

public interface IProductService extends IGenericService<Product, Long> {
    List<Product> getAllByCategoryId(long id);

    Page<Product> getAllPaginated(int page, int count, Sort.Direction direction, String sortProperty, String name, String description);
}
