package com.example.ullasblomsterapp.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class CustomBouquet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double totalPrice;
    private String flowersText;

    public CustomBouquet() {
    }

    //Konstruktør
    public CustomBouquet(Long id, double totalPrice, String flowersText) {
        this.id = id;
        this.totalPrice = totalPrice;
        this.flowersText = flowersText;
    }

    //Getters og setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getFlowersText() {
        return flowersText;
    }

    public void setFlowersText(String flowersText) {
        this.flowersText = flowersText;
    }
}