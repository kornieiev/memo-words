import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "eu-north-1",
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});

// interface FileProps {
//   lastModified: number;
//   lastModifiedDate: object;
//   name: string;
//   size: number;
//   type: string;
//   webkitRelativePath: string;
// }

// interface ParamsProps {
//   Bucket: string;
//   Key: string;
//   Body: string | null;
//   ContentType: string;
//   ACL: string;
// }

export const handleFileUpload = async (file) => {
  if (file) {
    try {
      const fileUrl = await uploadFileToS3(file);
      console.log("Uploaded file URL:", fileUrl);
      return fileUrl;
    } catch (error) {
      console.error("Upload failed:", error);
    }
  }
};

const uploadFileToS3 = async (file) => {
  const params = {
    Bucket: "memo-words",
    Key: `${Date.now()}-${file.name}`, // уникальное имя файла
    Body: file,
    ContentType: file.type,
    // ACL: "public-read", // доступ публичный для чтения
  };

  try {
    const command = new PutObjectCommand(params);
    await s3.send(command);
    return `https://memo-words.s3.eu-north-1.amazonaws.com/${params.Key}`;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

// https://memo-words.s3.eu-north-1.amazonaws.com/1731428862841-hockey.jpg
