package com.example.ullasblomsterapp.Repository;

import com.example.ullasblomsterapp.Model.CustomBouquet;
import org.springframework.data.jpa.repository.JpaRepository;

//Interface repository med JPA
public interface CustomBouquetRepository extends JpaRepository<CustomBouquet, Long> {
}