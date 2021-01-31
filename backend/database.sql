create database perntodo;

create table todo(
    todo serial primary key,
    description varchar(255)
);

alter table todo rename column todo to todo_id;
ALTER TABLE todo 
RENAME COLUMN todo TO todo_id;