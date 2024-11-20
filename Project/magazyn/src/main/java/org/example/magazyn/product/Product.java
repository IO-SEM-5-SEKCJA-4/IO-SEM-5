package org.example.magazyn.product;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String series_number;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private LocalDate expire_date;



    public Product() {}

    public Product(String name, String series_number, String description, LocalDate expire_date) {
        this.name = name;
        this.series_number = series_number;
        this.description = description;
        this.expire_date = expire_date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSeries_number() {
        return series_number;
    }

    public void setSeries_number(String series_number) {
        this.series_number = series_number;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {this.description = description;}

    public LocalDate getExpire_date() {return expire_date;}

    public void setExpire_date(LocalDate expire_date) {this.expire_date = expire_date;}
}
