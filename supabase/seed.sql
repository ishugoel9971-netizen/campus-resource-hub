-- Seed rows for the SQL editor. The app's canonical seed data is src/data/seed.json;
-- this statement loads the same demo set without exposing owner_token to reads.
insert into public.resources (type,title,url,body,subject,semester,tags,author,upvotes,owner_token,link_status,created_at) values
('link','DBMS Normalization Cheatsheet','https://www.geeksforgeeks.org/normal-forms-in-dbms/',null,'Database Systems',3,array['exam','cheatsheet','sql'],'Campus Index',18,'00000000-0000-0000-0000-000000000001','unknown','2026-09-21T10:00:00Z'),
('link','JavaScript Guide · MDN','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',null,'Web Development',3,array['javascript','web','reference'],'Campus Index',24,'00000000-0000-0000-0000-000000000001','unknown','2026-09-20T10:00:00Z'),
('note','Operating Systems Revision Map',null,'Processes → threads → scheduling → synchronization → memory → file systems. Start with the diagrams, then practise deadlock problems.','Operating Systems',4,array['revision','exam','systems'],'A. Mehta',12,'00000000-0000-0000-0000-000000000001','unknown','2026-09-19T10:00:00Z'),
('link','Data Structures Visualizations','https://visualgo.net/en',null,'Data Structures',3,array['visual','practice','algorithms'],'Campus Index',31,'00000000-0000-0000-0000-000000000001','unknown','2026-09-18T10:00:00Z'),
('link','Python Documentation','https://docs.python.org/3/tutorial/',null,'Programming Fundamentals',1,array['python','reference','basics'],'Campus Index',15,'00000000-0000-0000-0000-000000000001','unknown','2026-09-17T10:00:00Z'),
('note','Discrete Mathematics: Proof Checklist',null,'State the proposition. Define variables. Name the proof technique. Show each implication explicitly. Close with the original claim.','Discrete Mathematics',2,array['math','exam','checklist'],'R. Shah',9,'00000000-0000-0000-0000-000000000001','unknown','2026-09-16T10:00:00Z'),
('link','Git Book','https://git-scm.com/book/en/v2',null,'Software Engineering',5,array['git','tools','reference'],'Campus Index',20,'00000000-0000-0000-0000-000000000001','unknown','2026-09-15T10:00:00Z'),
('link','Computer Networks · HTTP','https://developer.mozilla.org/en-US/docs/Web/HTTP',null,'Computer Networks',4,array['networks','web','reference'],'Campus Index',14,'00000000-0000-0000-0000-000000000001','unknown','2026-09-14T10:00:00Z');
-- For the remaining 16 realistic entries, use the bundled JSON importer or insert
-- additional rows with the same fixed owner token. This file is intentionally safe
-- to run repeatedly only after clearing demo rows.
