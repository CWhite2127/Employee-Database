INSERT INTO department (name)
VALUES  ("Blues"),
        ("Math Rock"),
        ("Classic Rock"),
        ("Folk");


INSERT INTO role (title, salary, department_id)
VALUES  ("Blues Lead", "450000", 1),
        ("Blues Rhythym", "400000", 1),
        ("Math Rock Chord Specialist", "500000", 2),
        ("Math Rock Arpeggio Specialist", "600000", 2),
        ("Math Rock Harmonic Master", "800000", 2),
        ("Guitar Elite", "1000000", 3),
        ("Tap Master", "850000", 3),
        ("Chord Shape Inventor", "900000", 3),
        ("Lyrical Genius", "750000", 4),
        ("Youth Folk Outreach","650000", 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("John", "Mayer", 1, NULL),
        ("B.B.", "King", 2, 1),
        ("Tim", "Henson", 5, NULL),
        ("Ichika", "Nito", 3, 5),
        ("Yvette", "Young", 4, 5),
        ("Steve","Vai", 6, NULL),
        ("Eddie", "Van Halen", 7, 6),
        ("Jimi", "Hendrix", 8, 6),
        ("Bob", "Dylan", 9, NULL),
        ("Beck", "Hansen", 10, 9);