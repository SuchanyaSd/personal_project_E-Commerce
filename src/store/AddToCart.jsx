const addToCart = async (itemId, size, quantity, customerId) => {
   if (!size) {
      toast.error("Select Product Size");
      return;
   }

   try {
      if (!customerId) {
         toast.error("Please login to add items to cart.");
         return;
      }

      // 🔹 ส่งข้อมูลไปยัง Backend
      const res = await axios.post("http://localhost:8008/api/cart/add-cart", {
         customerId,
         productId: itemId,
         size,
         quantity
      });

      if (res.status === 201) {
         toast.success("Added to cart!");
      } else {
         toast.error("Failed to add to cart.");
      }
   } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Error adding item to cart.");
   }
};

export default addToCart;
