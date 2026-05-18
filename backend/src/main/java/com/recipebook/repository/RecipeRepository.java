package com.recipebook.repository;

import com.recipebook.entity.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    List<Recipe> findAllByOrderByDataCadastroDesc();
    List<Recipe> findByNomeContainingIgnoreCaseOrderByDataCadastroDesc(String nome);
}