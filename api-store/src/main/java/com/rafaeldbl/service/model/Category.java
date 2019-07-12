package com.rafaeldbl.service.model;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
@Entity
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull(message = "Nome da categoria não pode ser nulo.")
    @NotBlank(message = "Nome da categoria não pode ser branco.")
    @Column(unique = true)
    private String name;

    @Column(name = "created_at")
    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    public Date createdAt;

    @Column(name = "updated_at")
    @LastModifiedDate
    @Temporal(TemporalType.TIMESTAMP)
    public Date updatedAt;

}
