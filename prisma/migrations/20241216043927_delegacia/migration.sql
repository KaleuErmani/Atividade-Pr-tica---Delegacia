-- CreateTable
CREATE TABLE "criminoso" (
    "id" UUID NOT NULL,
    "nome" VARCHAR(60) NOT NULL,
    "sobrenome" VARCHAR(60) NOT NULL,
    "idade" INTEGER NOT NULL,
    "cpf" INTEGER NOT NULL,

    CONSTRAINT "criminoso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "arma" (
    "id" UUID NOT NULL,
    "tipo_da_arma" VARCHAR(255) NOT NULL,
    "calibre" VARCHAR(255),
    "dataApreensao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "crimesId" UUID NOT NULL,
    "criminososId" UUID NOT NULL,

    CONSTRAINT "arma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crime" (
    "id" UUID NOT NULL,
    "crime" VARCHAR(255) NOT NULL,
    "data_do_crime" TIMESTAMP(3) NOT NULL,
    "id_criminoso" UUID NOT NULL,
    "armasId" UUID NOT NULL,

    CONSTRAINT "crime_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "arma_crimesId_key" ON "arma"("crimesId");

-- CreateIndex
CREATE UNIQUE INDEX "crime_armasId_key" ON "crime"("armasId");

-- AddForeignKey
ALTER TABLE "arma" ADD CONSTRAINT "arma_criminososId_fkey" FOREIGN KEY ("criminososId") REFERENCES "criminoso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crime" ADD CONSTRAINT "crime_id_criminoso_fkey" FOREIGN KEY ("id_criminoso") REFERENCES "criminoso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crime" ADD CONSTRAINT "crime_armasId_fkey" FOREIGN KEY ("armasId") REFERENCES "arma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
