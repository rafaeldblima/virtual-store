package com.rafaeldbl.service.repository;

import com.rafaeldbl.service.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findAllByCategoryId(long id);

    List<Product> findAllByDescription(String description);
}
