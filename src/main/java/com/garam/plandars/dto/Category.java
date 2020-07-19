package com.garam.plandars.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_category")
public class Category {

    @Id
    @GeneratedValue
    @Column(name = "cate_code")
    private String cateCode;

    @Column(name = "cate_name")
    private String cateName;

    @Column(name = "cate_color")
    private String cateColor;

    @Column(name = "cate_text_color")
    private String cateTextColor;

    @Column(name = "cate_back_type")
    private String cateBackType; // full, transparent

}
