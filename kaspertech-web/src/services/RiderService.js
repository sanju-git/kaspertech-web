import RiderView from "../components/Rider/RiderView";
import http from "./Ajax";

class RiderService {
  static validateRider(name) {
    return http.post("/api/rider/validate", { name }).then((response) => {
      if (response.success) {
        return response;
      } else {
        throw new Error();
      }
    });
  }

  static getRiderOrders(name) {
    return http.get("/api/rider/orders?name=" + name).then((response) => {
      if (response.success) {
        return response;
      } else {
        throw new Error();
      }
    });
  }

  static changeOrderStatus(status, orderId, coordinates) {
    return http
      .patch("/api/rider/order-status", { status, orderId, coordinates })
      .then((response) => {
        if (response.success) {
          return response;
        } else {
          throw new Error();
        }
      });
  }
}
export default RiderService;
