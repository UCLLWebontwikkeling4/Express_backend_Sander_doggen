drop schema if exists web4;
create schema web4;
use web4;

create table student
(
    id     int auto_increment
        primary key,
    name   varchar(80)                   not null,
    status varchar(200) default 'online' not null,
    constraint student_name_uindex
        unique (name),
    constraint table_name_id_uindex
        unique (id)
)
    engine = InnoDB;

INSERT INTO web4.student (name, status) VALUES ('Mats', 'en ligne ');
INSERT INTO web4.student (name, status) VALUES ('Sander', 'online');
INSERT INTO web4.student (name, status) VALUES ('Vogels', 'online');

create table message
(
    id     int auto_increment
        primary key,
    author varchar(80)  not null,
    datum  date         not null,
    text   varchar(200) not null,
    constraint message_student_name_fk
        foreign key (author) references student (name)
)
    engine = InnoDB;

INSERT INTO web4.message (author, datum, text) VALUES ('Mats', '2022-05-14', 'Vandaag hebben we geleerd hoe we react correct moeten toepassen.');
INSERT INTO web4.message (author, datum, text) VALUES ('Sander', '2022-05-14', 'Ik heb vandaag een server kunnen opzetten voor onze database');
INSERT INTO web4.message (author, datum, text) VALUES ('Sander', '2022-05-14', 'Het is vandaag veel te warm om te studeren.');
INSERT INTO web4.message (author, datum, text) VALUES ('Mats', '2022-05-14', 'Amai ik heb net een super coole laptop gekocht');
INSERT INTO web4.message (author, datum, text) VALUES ('Vogels', '2022-05-17', 'VGO is met een week verlaat, hoezee hoeraa');
INSERT INTO web4.message (author, datum, text) VALUES ('sander', '2022-05-23', 'Ik zie de examens niet meer zitten #sad');

create table friends
(
    friend1 int not null,
    friend2 int not null,
    primary key (friend1, friend2),
    constraint friends_student_id_fk
        foreign key (friend1) references student (id),
    constraint friends_student_id_fk_2
        foreign key (friend2) references student (id)
)
    engine = InnoDB;

INSERT INTO web4.friends (friend1, friend2) VALUES (2, 1);
INSERT INTO web4.friends (friend1, friend2) VALUES (1, 2);
INSERT INTO web4.friends (friend1, friend2) VALUES (2, 2);
INSERT INTO web4.friends (friend1, friend2) VALUES (1, 3);
INSERT INTO web4.friends (friend1, friend2) VALUES (2, 3);
