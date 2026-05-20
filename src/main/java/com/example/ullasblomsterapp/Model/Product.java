package com.example.ullasblomsterapp.Model;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    // Mulighed B: Gør det til en fuld tekst-kolonne i PostgreSQL uden fast grænse
    @Column(columnDefinition = "TEXT")
    private String description;
    private BigDecimal price;
    private String imageUrl;

    @Enumerated(jakarta.persistence.EnumType.STRING)
    private ProductType productType;

    @Enumerated(jakarta.persistence.EnumType.STRING)
    private Category category;

    @Enumerated(jakarta.persistence.EnumType.STRING)
    private Occasion occasion;

    // tom konstruktør
    public Product() {
    }

    public Product(int id, String name, String description, BigDecimal price,
                   String imageUrl, ProductType productType,
                   Category category, Occasion occasion){
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.productType = productType;
        this.category = category;
        this.occasion = occasion;
    }

    // Getters
    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public ProductType getProductType() {
        return productType;
    }

    public Category getCategory() {
        return category;
    }

    public Occasion getOccasion() {
        return occasion;
    }

    // Setters
    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void setProductType(ProductType productType) {
        this.productType = productType;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public void setOccasion(Occasion occasion) {
        this.occasion = occasion;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", price=" + price +
                '}';
    }
}