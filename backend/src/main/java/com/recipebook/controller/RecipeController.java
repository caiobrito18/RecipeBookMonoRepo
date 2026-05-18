package com.recipebook.controller;

import com.recipebook.entity.Recipe;
import com.recipebook.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/receitas")
public class RecipeController {

    @Autowired
    private RecipeRepository recipeRepository;

    @GetMapping
    public List<Recipe> listar() {
        return recipeRepository.findAllByOrderByDataCadastroDesc();
    }
}