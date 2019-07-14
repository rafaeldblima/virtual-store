package com.rafaeldbl.service.controller;

import com.rafaeldbl.service.model.Product;
import com.rafaeldbl.service.service.impl.ProductService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;


@Api(value = "Product Controller", description = "Endpoints para produto.")
@RestController
@RequestMapping(path = "/api/product", produces = MediaType.APPLICATION_JSON_VALUE)
public class ProductController {

    private final ProductService service;

    @Autowired
    public ProductController(ProductService service) {
        this.service = service;
    }

    @RequestMapping(path = "", method = RequestMethod.GET)
    @ApiOperation(value = "Busca todos os produtos com paginação.")
    public Page<Product> getAllPaginated(
            @RequestParam(value = "page", defaultValue = "0", required = false) int page,
            @RequestParam(value = "count", defaultValue = "10", required = false) int count,
            @RequestParam(value = "order", defaultValue = "ASC", required = false) Sort.Direction direction,
            @RequestParam(value = "sort", defaultValue = "name", required = false) String sortProperty,
            @RequestParam(defaultValue = "", required = false) String name,
            @RequestParam(defaultValue = "", required = false) String description
    ) {
        return service.getAllPaginated(page, count, direction, sortProperty, name, description);
    }

    @RequestMapping(path = "", method = RequestMethod.POST)
    @ApiOperation(value = "Cria um produto.")
    public ResponseEntity<Product> createOrUpdate(
            @ApiParam(value = "Produto", required = true)
            @RequestBody @Valid Product product
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.saveOrUpdate(product));
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
    @ApiOperation(value = "Buscar um produto pelo ID.")
    public ResponseEntity<Product> find(
            @ApiParam(value = "Id do produto", required = true, example = "0", defaultValue = "0")
            @PathVariable Long id
    ) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(service.get(id));
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
            throw new EntityNotFoundException("Produto não existe.");
        }
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.PUT)
    @ApiOperation(value = "Atualiza produto.")
    public ResponseEntity<Product> update(
            @ApiParam(value = "Produto", required = true)
            @RequestBody @Valid Product product,
            @ApiParam(value = "Id do produto", required = true, example = "0", defaultValue = "0")
            @PathVariable() Long id

    ) throws EntityNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(service.update(id, product));
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
    @ApiOperation(value = "Deletar um produto pelo ID.")
    public HttpEntity<Product> delete(
            @ApiParam(value = "Id do produto", required = true, example = "0", defaultValue = "0")
            @PathVariable() Long id
    ) throws EntityNotFoundException {
        service.removeById(id);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }


}
