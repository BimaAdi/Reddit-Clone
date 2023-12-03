-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "commenting_comment_id" UUID;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_commenting_comment_id_fkey" FOREIGN KEY ("commenting_comment_id") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
