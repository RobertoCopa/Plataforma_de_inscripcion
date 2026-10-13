ALTER TABLE registrations
ADD COLUMN career TEXT CHECK (
  career IS NULL OR career IN (
    'Ingeniería Informática',
    'Tec. Sup.: Desarrollo de Sistemas Informáticos',
    'Tec. Sup.: Administrador de Base de Datos',
    'Tec. Sup.: Redes y Ciberseguridad'
  )
);
