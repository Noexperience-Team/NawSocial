export const checkImage = (file) => {
  let err = "";
  if (!file) return (err = "مش موجود");
  if (file.size > 2000 * 2000) err = "الطاي ماكسيمال 1ميقا";
  if (
    file.type !== "image/jpeg" &&
    file.type !== "image/png" &&
    file.type !== "image/jpg"
  )
    err = "أختار تصويرة";
  return err;
};
export const imageUpload = async (images) => {
  let imgArr = [];
  for (const item of images) {
    const formData = new FormData();
    formData.append("file", item);
    formData.append("upload_preset", "lvjkfstw");
    formData.append("cloud_name", "dq52ifash");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dq52ifash/image/upload",
      { method: "POST", body: formData }
    );
    const data = await res.json();
    imgArr.push({ public_id: data.public_id, url: data.secure_url });
  }
  return imgArr;
};
