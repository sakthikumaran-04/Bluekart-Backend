import { Product } from "../models/product.model.js";

export const getProducts = async (req, res) => {
  let products;
  const { sort, sortField, skip, limit } = req;
  try {
    if (sort) {
      let sortQuery = {};
      sortQuery[sortField] = sort; // Dynamically set the sort field
      products = await Product.find().sort(sortQuery).skip(skip).limit(limit);
    } else {
      products = await Product.find().skip(skip).limit(limit);
    }
    const total = await Product.countDocuments();
    res.status(200).json({ products, total, skip, limit });
  } catch (error) {
    res.status(500).json({ msg: error.message, success: false });
  }
};
export const getCategory = async (req, res) => {
  try {
    const {skip,limit,sort,sortField}=req;
    let products;
    if (sort) {
        let sortQuery = {};
        sortQuery[sortField] = sort; // Dynamically set the sort field
        products = await Product.find({category: req.params.category}).sort(sortQuery).skip(skip).limit(limit);
      } else {
        products = await Product.find({category: req.params.category}).skip(skip).limit(limit);
      }
    const productItems = [...products];
    const total = productItems.length;
    res.status(200).json({
      products: productItems,
      total: total,
      skip: skip,
      limit: limit
    });
  } catch (error) {
    res.status(500).json({ msg: error.message, success: false });
  }
};
export const searchProducts = async (req, res) => {
  const { sort, sortField, search, skip, limit } = req;
  let products;
  try {
    const regex = new RegExp(search, "i");
    console.log(regex);
    if (sort) {
      let sortQuery = {};
      sortQuery[sortField] = sort;
      products = await Product.find({
        $or: [
          { name: { $regex: regex } },
          { description: { $regex: regex } },
          { category: { $regex: regex } },
        ],
      })
        .sort(sortQuery)
        .skip(parseInt(skip))
        .limit(parseInt(limit));
    } else {
      products = await Product.find({
        $or: [
          { name: { $regex: regex } },
          { description: { $regex: regex } },
          { category: { $regex: regex } },
        ],
      })
        .skip(parseInt(skip))
        .limit(parseInt(limit));
    }

    const total = await Product.countDocuments({
      $or: [
        { name: { $regex: regex } },
        { description: { $regex: regex } },
        { category: { $regex: regex } },
      ],
    });
    res.status(200).json({
      products,
      total,
      skip: parseInt(skip),
      limit: parseInt(limit),
    });
  } catch (error) {
    res.status(500).json({ msg: error.message, success: false });
  }
};
export const fetchSingleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.find({ _id: id });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ msg: error.message, success: false });
  }
};
export const fetchAllCategories = (req,res) => {
  try {
    res.status(200).json({
      status: "success",
      categories: [
        "smartphone",
        "laptop",
        "fragrances",
        "skincare",
        "groceries",
        "decoration",
        "furniture",
        "cloths",
        "shoes",
        "bags",
        "jewels",
        "sunglasses",
        "sports",
        "lighting",
      ],
    });
  } catch (error) {
    res.status(500).json({ msg: error.message, success: false });
  }
};
