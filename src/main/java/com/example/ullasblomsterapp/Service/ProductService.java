package com.example.ullasblomsterapp.Service;

import com.example.ullasblomsterapp.Model.Occasion; // Husk import!
import com.example.ullasblomsterapp.Model.Product;
import com.example.ullasblomsterapp.Model.ProductType;
import com.example.ullasblomsterapp.Repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public List<Product> getAllProducts() {
        return repository.findAll();
    }

    public List<Product> getProductsByType(ProductType type) {
        return repository.findAll().stream()
                .filter(product -> product.getProductType() == type)
                .collect(Collectors.toList());
    }

    // NY METODE: Filtrering baseret på Occasion
    public List<Product> getProductsByOccasion(Occasion occasion) {
        return repository.findByOccasion(occasion);
    }

    public Product saveProduct(Product product) {
        return repository.save(product);
    }
}