-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "IeltsAnswer" (
    "id" SERIAL NOT NULL,
    "tag" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "IeltsAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IeltsPartOne" (
    "id" SERIAL NOT NULL,
    "ielts_answer_id" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "ideal_answer" TEXT NOT NULL,

    CONSTRAINT "IeltsPartOne_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IeltsPartTwo" (
    "id" SERIAL NOT NULL,
    "ielts_answer_id" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "shouldSay" TEXT[],
    "answer" TEXT NOT NULL,
    "ideal_answer" TEXT NOT NULL,

    CONSTRAINT "IeltsPartTwo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IeltsPartThree" (
    "id" SERIAL NOT NULL,
    "ielts_answer_id" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "ideal_answer" TEXT NOT NULL,

    CONSTRAINT "IeltsPartThree_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewAnswer" (
    "id" SERIAL NOT NULL,
    "tag" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "InterviewAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewPartOne" (
    "id" SERIAL NOT NULL,
    "interview_answer_id" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "ideal_answer" TEXT NOT NULL,

    CONSTRAINT "InterviewPartOne_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "IeltsPartTwo_ielts_answer_id_key" ON "IeltsPartTwo"("ielts_answer_id");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IeltsPartOne" ADD CONSTRAINT "IeltsPartOne_ielts_answer_id_fkey" FOREIGN KEY ("ielts_answer_id") REFERENCES "IeltsAnswer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IeltsPartTwo" ADD CONSTRAINT "IeltsPartTwo_ielts_answer_id_fkey" FOREIGN KEY ("ielts_answer_id") REFERENCES "IeltsAnswer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IeltsPartThree" ADD CONSTRAINT "IeltsPartThree_ielts_answer_id_fkey" FOREIGN KEY ("ielts_answer_id") REFERENCES "IeltsAnswer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewPartOne" ADD CONSTRAINT "InterviewPartOne_interview_answer_id_fkey" FOREIGN KEY ("interview_answer_id") REFERENCES "InterviewAnswer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
