create Table categories(
  id int(12) primary key auto_increment,
  name varchar(255)
)default charset=utf8;
insert into categories (name) VALUES
('要闻'),
('财经'),
('娱乐'),
('体育'),
('军事'),
('科技'),
('历史'),
('凤凰号');

create Table news (
  id int(12) primary key auto_increment,
  title varchar(255),
  skey varchar(255),
  thumbnail varchar(255),
  url varchar(255),
  cat int(12)
)default charset=utf8;