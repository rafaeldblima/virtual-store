package com.rafaeldbl.service.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.hibernate.validator.constraints.Length;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
@Entity
@ApiModel(description = "Modelo Produto.")
@EntityListeners(AuditingEntityListener.class)
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty(value = "Id do produto", example = "1")
    private Long id;

    @NotNull(message = "Codigo do produto não pode ser nulo.")
    @Length(min = 4, max = 20, message = "Código do produto deve ter entre 4 e 20 caracteres.")
    @Column(unique = true)
    private String code;

    @NotNull(message = "Quantidade de estoque do produto não pode ser nulo.")
    @Min(value = 0L, message = "Quantidade de estoque do produto não pode ser negativa.")
    private Long stockQuantity;

    @NotNull(message = "Nome do produto não pode ser nulo.")
    @NotBlank(message = "Nome do produto não pode ser branco.")
    @Length(max = 50, message = "Nome do produto não pode ter mais que 50 caracteres.")
    private String name;

    @Length(max = 255, message = "Nome do produto não pode ter mais que 255 caracteres.")
    private String description;

    @NotNull(message = "Preço do produto não pode ser nulo.")
    @Min(value = 0L, message = "Preço do produto não pode ser  negativo.")
    private Double price;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @NotNull(message = "Categoria do produto não pode ser nula.")
    private Category category;

    @Column(name = "created_at")
    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    public Date createdAt;

    @Column(name = "updated_at")
    @LastModifiedDate
    @Temporal(TemporalType.TIMESTAMP)
    public Date updatedAt;

}
