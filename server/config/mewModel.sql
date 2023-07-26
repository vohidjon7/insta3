
drop table if exists users cascade;
create table users(
    user_id bigserial primary key,
    login varchar(50) not null,
    email varchar(100) not null,
    password varchar(200) not null,
    bio varchar(200),
    foydalanuvchi_img varchar(200)
);

drop table if exists post cascade;
create table post(
    post_id bigserial primary key,
    img_url varchar(300) not null,
    post varchar(100) not null,
    user_id bigint not null references users(user_id)
);

drop table if exists likes cascade;
create table likes(
    like_id bigserial primary key,
    post1_id bigint not null references post(post_id),
    user1_id bigint not null references users(user_id),
    istrue boolean default false
);



