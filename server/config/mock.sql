create database instagram;

create table foydalanuvchi(
    id bigserial primary key,
    login varchar(50) not null,
    email varchar(100) not null,
    password varchar(200) not null,
    bio varchar(200),
    foydalanuvchi_img varchar(200)
);

create table post(
    id bigserial primary key,
    img_url varchar(300) not null,
    post varchar(100) not null,
    user_id varchar(10) not null
)