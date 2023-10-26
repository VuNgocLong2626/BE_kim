-- CreateTable
CREATE TABLE "About" (
    "id" TEXT NOT NULL,
    "id_account" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "About_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "About_id_account_key" ON "About"("id_account");

-- AddForeignKey
ALTER TABLE "About" ADD CONSTRAINT "About_id_account_fkey" FOREIGN KEY ("id_account") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
