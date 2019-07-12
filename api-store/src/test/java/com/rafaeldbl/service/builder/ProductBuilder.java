package com.rafaeldbl.service.builder;

import com.google.common.collect.ImmutableList;
import com.rafaeldbl.service.model.Category;
import com.rafaeldbl.service.model.Product;

import java.util.List;

public class ProductBuilder {
    private Product product;

    private ProductBuilder() {
    }

    public static ProductBuilder oneProduct() {
        return oneProduct(1L, "Product 1");
    }

    public static List<Product> productList(int length) {
        List<Product> produtos = new java.util.ArrayList<>(ImmutableList.of());
        for (long i = 0; i < length; i++) {
            produtos.add(oneProduct(i, "Product" + i).now());
        }
        return produtos;
    }

    public static ProductBuilder oneProductWithCategory() {
        return oneProduct(1L, "Product 1").withCategory(CategoryBuilder.oneCategory().now());
    }

    private static ProductBuilder oneProduct(Long id, String name) {
        ProductBuilder builder = new ProductBuilder();

        builder.product = new Product();
        builder.product.setId(id);
        builder.product.setCode("54654");
        builder.product.setName(name);
        builder.product.setDescription("Product description");
        builder.product.setPrice(10.0);
        builder.product.setStockQuantity(10L);
        builder.product.setCategory(null);
        return builder;
    }

    public ProductBuilder withCategory(Category category) {
        product.setCategory(category);
        return this;
    }

    public Product now() {
        return product;
    }

    public ProductBuilder withId(long id) {
        product.setId(id);
        return this;
    }
}
