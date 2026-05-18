package com.recipebook.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recipebook.entity.Recipe;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    List<Recipe> findAllByOrderByDataCadastroDesc();

    List<Recipe> findByNomeContainingIgnoreCaseOrderByDataCadastroDesc(String nome);
}