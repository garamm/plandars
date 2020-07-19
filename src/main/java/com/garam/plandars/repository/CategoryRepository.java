package com.garam.plandars.repository;


import com.garam.plandars.dto.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
