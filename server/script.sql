use testdb;

CREATE TABLE IF NOT EXISTS `tutorials` (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  description varchar(255),
  published boolean DEFAULT false
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

insert into tutorials values (1, 'Title 1', 'Description 1', true);
insert into tutorials values (2, 'Title 2', 'Description 2', false);
insert into tutorials values (3, 'Title 3', 'Description 3', false);
insert into tutorials values (4, 'Title 4', 'Description 4', true);