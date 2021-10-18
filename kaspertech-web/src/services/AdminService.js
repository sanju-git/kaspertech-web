import http from "./Ajax";

class AdminService {
  static getRiderOptions() {
    return http.get("/api/admin/get-riders").then((response) => {
      if (response.success) {
        return response;
      } else {
        throw new Error();
      }
    });
  }
  static createOrder(orderDetails) {
    return http
      .post("/api/admin/create-order", { orderDetails })
      .then((data) => {
        if (data.success) {
          return data;
        } else {
          throw new Error();
        }
      });
  }
  static getAllOrders() {
    return http.get("/api/admin/get-all-orders").then((response) => {
      if (response.success) {
        return response;
      } else {
        throw new Error();
      }
    });
  }
}

export default AdminService;
