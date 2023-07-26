create database instagram;


drop table if exists foydalanuvchi cascade;


drop table if exists post cascade;

drop table if exists likes cascade;
create table likes(
    id bigserial primary key,
    user_id bigint not null references foydalanuvchi(user_id),
    istrue boolean default false
);

create table foydalanuvchi(
    user_id bigserial primary key,
    login varchar(50) not null,
    email varchar(100) not null,
    password varchar(200) not null,
    bio varchar(200),
    foydalanuvchi_img varchar(200)
);

create table post(
    post_id bigserial primary key,
    img_url varchar(300) not null,
    post varchar(100) not null,
    user_id varchar(10) not null
);