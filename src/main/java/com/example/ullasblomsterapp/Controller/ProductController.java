package com.example.ullasblomsterapp.Controller;

import com.example.ullasblomsterapp.Model.Occasion;
import com.example.ullasblomsterapp.Model.Product;
import com.example.ullasblomsterapp.Model.ProductType;
import com.example.ullasblomsterapp.Service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin // VIGTIGT: Tillader at din JavaScript frontend må snakke med Spring Boot
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    // Hent alle produkter ELLER filtrer på en anledning (Occasion)
    @GetMapping
    public List<Product> getProducts(@RequestParam(required = false) Occasion occasion) {
        // Hvis frontend sender "?occasion=ROMANCE", henter vi kun dem
        if (occasion != null) {
            return service.getProductsByOccasion(occasion);
        }
        // Ellers returnerer vi bare alle produkter til forsiden
        return service.getAllProducts();
    }

    // Opret produkt
    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return service.saveProduct(product);
    }

    // Hent produkter efter type (hvis du stadig skal bruge denne)
    @GetMapping("/type/{type}")
    public List<Product> getByType(@PathVariable ProductType type) {
        return service.getProductsByType(type);
    }
}