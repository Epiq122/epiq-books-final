package com.gleasondev.epiqbooksbackend.entity;import lombok.Data;import lombok.NoArgsConstructor;import javax.persistence.*;import java.util.List;enum Role {    ROLE_USER,    ROLE_ADMIN}@Entity@Table(name = "users")@Data@NoArgsConstructorpublic class User {    @Id    @GeneratedValue(strategy = GenerationType.IDENTITY)    @Column(name = "id")    private Long id;    @Column(name = "email", unique = true)    private String email;    @Column(name = "password")    private String password;    @Enumerated(EnumType.STRING)    @Column(name = "role")    private Role role;    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)    private List<Checkout> checkouts;    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)    private List<History> histories;    public User(String email, String password, Role role) {        this.email = email;        this.password = password;        this.role = role;    }}