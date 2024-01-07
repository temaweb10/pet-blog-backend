import PostModel from "../models/Post.js";
export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();

    res.json({ post });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось выложить пост",
    });
  }
};
export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();

    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить посты",
    });
  }
};
export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      }
    ).then((doc, err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Failed to return the post",
        });
      }
      if (!doc) {
        return res.status(404).json({
          message: "Post not found",
        });
      }
      res.json(doc);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndDelete({
      _id: postId,
    }).then((doc, err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Не удалось удалить пост",
        });
      }
      if (!doc) {
        return res.status(404).json({
          message: "Статья не найдета",
        });
      }
      res.json({ success: true });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error",
    });
  }
};
export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    console.log("UPDATA");
    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId,
      }
    );

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось обновить статью",
    });
  }
};
