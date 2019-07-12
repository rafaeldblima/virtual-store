package com.rafaeldbl.service.service;

import com.rafaeldbl.service.builder.CategoryBuilder;
import com.rafaeldbl.service.builder.ProductBuilder;
import com.rafaeldbl.service.model.Category;
import com.rafaeldbl.service.model.Product;
import com.rafaeldbl.service.repository.ProductRepository;
import com.rafaeldbl.service.service.impl.ProductService;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import javax.persistence.EntityNotFoundException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class ProductServiceTest {


    @InjectMocks
    private ProductService service;

    @Mock
    private ProductRepository repository;

    @Rule
    public ExpectedException exception = ExpectedException.none();

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void shouldGetAllCategories() {
        List<Product> products = ProductBuilder.productList(3);

        when(repository.findAll()).thenReturn(products);

        assertEquals(products, service.getAll());
        assertEquals(3, service.getAll().size());
    }

    @Test
    public void shouldGetProductByCategoryId() {
        Category category = CategoryBuilder.oneCategory().now();
        List<Product> products = Collections.singletonList(ProductBuilder.oneProduct().withCategory(category).now());

        when(repository.findAllByCategoryId(category.getId())).thenReturn(products);

        assertEquals(products, service.getAllByCategoryId(category.getId()));
    }

    @Test
    public void shouldCreateAProduct() {
        Category category = CategoryBuilder.oneCategory().now();
        Product product = ProductBuilder.oneProduct().withCategory(category).now();

        when(repository.save(product)).thenReturn(product);

        assertEquals(product, service.add(product));
    }

    @Test
    public void shouldUpdateProduct() {
        Product productInDb = ProductBuilder.oneProduct().now();
        Product product = ProductBuilder.oneProduct().withId(productInDb.getId()).withCategory(CategoryBuilder.oneCategory().now()).now();
        when(repository.findById(product.getId())).thenReturn(Optional.of(productInDb));
        when(repository.save(product)).thenReturn(product);

        assertEquals(product, service.update(productInDb.getId(), product));
        assertNotEquals(productInDb.getCategory(), product.getCategory());
    }

    @Test
    public void shouldDeleteAProduct() {
        Product product = ProductBuilder.oneProduct().withId(1L).now();

        when(repository.findById(1L)).thenReturn(Optional.ofNullable(product));

        service.removeById(1L);
        verify(repository).deleteById(1L);
    }

    @Test
    public void shouldThrowExceptionIfProductDoesNotExist() {
        exception.expect(EntityNotFoundException.class);
        exception.expectMessage("Não encontrado.");

        service.removeById(1L);
    }

}
