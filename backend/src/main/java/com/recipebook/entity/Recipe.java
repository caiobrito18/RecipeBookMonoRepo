package com.recipebook.entity;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persi

    rt jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validatio

    
@Entity
public class Recipe {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    

    @Column(unique = true)
    private String nome;
    

    @Enumerated(EnumType.STRING)
    private Categoria categoria;
    

    @Min(value = 1, message = "O tempo de preparo deve ser pelo menos 1 minuto")
    private Integer tempoPreparo;
    

    @Min(value = 1, message = "A quantidade de porções não pode ser menor do que 1")
    private Integer porcoes;
    
    @NotEmpty(message = "
         receita d
    v

    @ElementCollection
        
    

    
        
    

    @NotBlank(message = "O modo de pre
        aro é obrigatório
    )

    private String modoPreparo;
        
    

    
        
    

    
        
    

    // Getters and Setters
        
    

    public void setId(Long id) { 
        his.id = id; }
    

    
        
    

    public void setNome(String nome) { this
        nome = nome; }
    

    
        
    

    public void setCategoria(Categor
        a categoria) { this
    c

    
        
    

    public void setTempoPreparo(Integer temp
        Preparo) { this.temp
    P

    
        
    
    public Integer getPorcoes() { return porcoes; }
    public void setPorcoes(Integer porcoes) { this.porcoes = porcoes; }
    
    public List<String> getIngredientes() { return ingredientes; }
    public void setIngredientes(List<String> ingredientes) { this.ingredientes = ingredientes; }
    
    public String getModoPreparo() { return modoPreparo; }
    public void setModoPreparo(String modoPreparo) { this.modoPreparo = modoPreparo; }
    
    public LocalDateTime getDataCadastro() { return dataCadastro; }
    public void setDataCadastro(LocalDateTime dataCadastro) { this.dataCadastro = dataCadastro; }
}