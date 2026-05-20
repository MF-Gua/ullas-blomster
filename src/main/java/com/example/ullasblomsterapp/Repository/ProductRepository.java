package com.example.ullasblomsterapp.Repository;

import com.example.ullasblomsterapp.Model.Occasion;
import com.example.ullasblomsterapp.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    // Spring Boot genererer automatisk SQL for denne metode!
    List<Product> findByOccasion(Occasion occasion);
}