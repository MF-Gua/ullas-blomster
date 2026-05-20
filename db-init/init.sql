DROP TABLE IF EXISTS product;
CREATE TABLE product (
                         id SERIAL PRIMARY KEY,
                         name VARCHAR(255) NOT NULL,
                         description TEXT,
                         price DECIMAL(10, 2) NOT NULL,
                         image_url VARCHAR(500),
                         product_type VARCHAR(50),
                         category VARCHAR(50),
                         occasion VARCHAR(50)
);

DROP TABLE IF EXISTS custom_bouquet;
CREATE TABLE custom_bouquet (
                                id SERIAL PRIMARY KEY,
                                total_price DECIMAL(10,2) NOT NULL,
                                flowers_text TEXT NOT NULL
);

INSERT INTO product (name, description, price, image_url, product_type, category, occasion)
VALUES
    ('Rose', 'Enkelt rød rose', 25.00, '/images/flowers/rose.png', 'FLOWER', 'FLOWERS', 'ROMANCE'),
    ('Tulipan', 'Enkelt pink tulipan', 20.00, '/images/flowers/tulip.png', 'FLOWER', 'FLOWERS', 'BIRTHDAY'),
    ('Lilje', 'Enkelt hvid lilje', 30.00, '/images/flowers/lily.png', 'FLOWER', 'FLOWERS', 'WEDDING'),
    ('Pæon', 'Enkelt lyserød pæon', 35.00, '/images/flowers/peony.png', 'FLOWER', 'FLOWERS', 'ROMANCE'),
    ('Solsikke', 'Enkelt solsikke', 22.00, '/images/flowers/sunflower.png', 'FLOWER', 'FLOWERS', 'GRADUATION'),
    ('Rød Elegance', 'Klassisk buket med mørkerøde roser. Perfekt til at vise din kærlighed.', 299.00, 'https://picsum.photos/id/152/800/800', 'BOUQUET', 'BOUQUETS', 'ROMANCE'),
    ('Kærlighedsæske', 'En smuk gavekurv med chokolade og en enkelt rose.', 350.00, 'https://picsum.photos/id/200/800/800', 'GIFT_BASKET', 'GIFT_ITEMS', 'ROMANCE'),
    ('Hvid Fred', 'Respektfuld og smuk bårebuket i hvide nuancer.', 450.00, 'https://picsum.photos/id/306/800/800', 'BOUQUET', 'BOUQUETS', 'FUNERAL'),
    ('Stille Minde', 'Enkelt hvid lilje til at lægge ved kisten.', 75.00, 'https://picsum.photos/id/310/800/800', 'FLOWER', 'FLOWERS', 'FUNERAL'),
    ('Birthday Joy', 'Farverig og festlig buket, der bringer glæde til enhver fødselsdag.', 199.50, 'https://picsum.photos/id/629/800/800', 'BOUQUET', 'BOUQUETS', 'BIRTHDAY'),
    ('Fødselsdags Kurv', 'Gavekurv med lækkerier og små tørrede blomster.', 400.00, 'https://picsum.photos/id/400/800/800', 'GIFT_BASKET', 'GIFT_ITEMS', 'BIRTHDAY'),
    ('Tørret Jubel', 'Flot evighedsbuket af tørrede blomster til fødselaren.', 250.00, 'https://picsum.photos/id/100/800/800', 'BOUQUET', 'DRIED_FLOWERS', 'BIRTHDAY'),
    ('Graduation Dream', 'Fejr den store dag med en sprudlende og stolt buket.', 350.00, 'https://picsum.photos/id/429/800/800', 'BOUQUET', 'BOUQUETS', 'GRADUATION'),
    ('Studenter Bamse', 'Lille bamse med studenterhue til at sætte i buketten.', 49.00, 'https://picsum.photos/id/430/800/800', 'SPECIAL_ORDER', 'ACCESSORIES', 'GRADUATION'),
    ('Wedding Bliss', 'Elegante hvide liljer og fint brudeslør til den perfekte dag.', 599.00, 'https://picsum.photos/id/824/800/800', 'BOUQUET', 'BOUQUETS', 'WEDDING'),
    ('Brudens Drøm', 'Specialbunden brudebuket efter brudens præcise ønsker.', 899.00, 'https://picsum.photos/id/830/800/800', 'CUSTOM_BOUQUET', 'BOUQUETS', 'WEDDING'),
    ('For Mom', 'Lyserøde pæoner og duftende eukalyptus. Fordi hun fortjener det.', 325.00, 'https://picsum.photos/id/106/800/800', 'BOUQUET', 'BOUQUETS', 'MOTHERS_DAY'),
    ('Mors Plantedrøm', 'En smuk og nem stueplante i krukke.', 150.00, 'https://picsum.photos/id/250/800/800', 'FLOWER', 'PLANTS', 'MOTHERS_DAY');